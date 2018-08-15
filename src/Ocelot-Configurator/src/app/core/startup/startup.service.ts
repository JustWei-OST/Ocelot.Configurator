import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ACLService } from '@delon/acl';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(
    private menuService: MenuService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private httpClient: HttpClient,
    private injector: Injector
  ) { }

  private viaHttp(resolve: any, reject: any) {
    zip(
      this.httpClient.get('assets/tmp/app-data.json')
    ).pipe(
      // 接收其他拦截器后产生的异常消息
      catchError(([appData]) => {
          resolve(null);
          return [appData];
      })
    ).subscribe(([appData]) => {

      // application data
      const res: any = appData;
      // 应用信息：包括站点名、描述、年份
      this.settingService.setApp(res.app);
      // 用户信息：包括姓名、头像、邮箱地址
      this.settingService.setUser(res.user);
      // ACL：设置权限为全量
      this.aclService.setFull(true);
      // 初始化菜单
      this.menuService.add(res.menu);
      // 设置页面标题的后缀
      this.titleService.suffix = res.app.name;
    },
    () => { },
    () => {
      resolve(null);
    });
  }

  private viaMock(resolve: any, reject: any) {
    // const tokenData = this.tokenService.get();
    // if (!tokenData.token) {
    //   this.injector.get(Router).navigateByUrl('/passport/login');
    //   resolve({});
    //   return;
    // }
    // mock
    const app: any = {
      name: `Tools`,
      description: `想不到的描述`
    };
    const user: any = {
      name: 'wlclass',
      avatar: './assets/tmp/img/avatar.jpg',
      email: 'wlclass@163.com',
      token: '123456789'
    };
    // 应用信息：包括站点名、描述、年份
    this.settingService.setApp(app);
    // 用户信息：包括姓名、头像、邮箱地址
    this.settingService.setUser(user);
    // ACL：设置权限为全量
    this.aclService.setFull(true);
    // 初始化菜单
    this.menuService.add([
      {
        text: 'XX系统',
        group: true,
        children: [
          {
            text: '工作台',
            link: '/dashboard',
            icon: 'anticon anticon-appstore-o'
          },
          {
            text: 'Ocelot网关管理',
            icon: 'anticon anticon-appstore-o',
            children: [
              {
                text: '服务器列表',
                link: '/ocelot',
                icon: 'anticon anticon-appstore-o'
              },
            ]
          },
          {
            text: 'Ocelot学习资源',
            icon: 'anticon anticon-appstore-o',
            children: [
              {
                text: 'Ocelot Github',
                externalLink: 'https://github.com/ThreeMammals/Ocelot',
                icon: 'anticon anticon-appstore-o',
                target: '_blank'
              },
              {
                text: 'Ocelot Doc',
                externalLink: 'http://ocelot.readthedocs.io',
                icon: 'anticon anticon-appstore-o',
                target: '_blank'
              },
              {
                text: 'Ocelot.Configurator Github',
                externalLink: 'https://github.com/JustWei-OST/Ocelot.Configurator',
                icon: 'anticon anticon-appstore-o',
                target: '_blank'
              },
            ]
          }
        ]
      },
      

    ]);
    // 设置页面标题的后缀
    this.titleService.suffix = app.name;

    resolve({});
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      // http
      // this.viaHttp(resolve, reject);
      // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
      this.viaMock(resolve, reject);
    });
  }
}