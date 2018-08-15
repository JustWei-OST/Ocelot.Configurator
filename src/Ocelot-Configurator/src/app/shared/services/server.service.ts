import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService, DA_SERVICE_TOKEN } from '@delon/auth';

@Injectable()
export class ServerService {

  servers: Server[] = [];

  constructor(
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    private http: HttpClient) {
    this.loadServers();
  }

  loadServers() {

    let con = localStorage.getItem(this.normalizeStorageKey('Servers'));
    try {
      if (con) {
        this.servers = JSON.parse(con);
      }
    } catch (e) {
      this.servers = [];
      this.save();
    }
  }

  mockServers(count: number) {
    for (var i = 0; i < count; i++) {
      this.servers.push({
        Alias: `MyServer${i + 1}`,
        Host: `biz${i + 1}.myhost.com`,
        GrantType: 'client_credentials',
        Port: 80 + i,
        Scheme: 'http',
        AdministrationApiPath: '/administration'
      });
    }

    this.servers.push({
      Alias: `本机测试`,
      Host: `localhost`,
      GrantType: 'client_credentials',
      Port: 5000,
      Scheme: 'http',
      AdministrationApiPath: '/administration'
    });

  }
  /**
   * 添加服务器
   * @param server
   */
  addServer(server: Server): Promise<any> {
    return new Promise((resolver, reject) => {
      this.servers.push(server);
      this.save();
      resolver({ Status: true });
    })
  }

  /**
   * 保存配置
   */
  save() {
    localStorage.setItem(this.normalizeStorageKey('Servers'), JSON.stringify(this.servers));
  }
  /**
   * 删除一个服务器
   * @param server
   */
  removeServer(server: Server): Promise<any> {
    return new Promise((resolver, reject) => {
      this.servers = this.servers.filter(p => p != server);
      this.save();
      resolver({ Status: true });
    })
  }
  /**
   * 统一化本地存储的Key
   * @param key
   */
  normalizeStorageKey(key: string) {
    const storagePrefix = 'OC-';
    return storagePrefix + key.trim();
  }

  /**
   * 登陆到服务器
   * @param model
   */
  login(model: LoginModel): Promise<boolean> {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('JwtToken');

      if (model && model.Server) {
        const server = model.Server;
        const url = server.Scheme + '://' + server.Host + (server.Port != 80 ? (':' + server.Port) : '')
          + server.AdministrationApiPath + '/connect/token';

        let formData = new FormData();
        formData.append('client_id', model.Client_Id);
        formData.append('client_secret', model.Client_Secret);
        formData.append('grant_type', server.GrantType);

        this.http.post(url, formData).toPromise()
          .then(p => {
            if (p) {
              let jwtToken = p['access_token'];
              if (jwtToken) {
                //localStorage.setItem('JwtToken', jwtToken);

                this.tokenService.set({
                  token: jwtToken,
                  host: server.Scheme + '://' + server.Host + (server.Port != 80 ? (':' + server.Port) : ''),
                  time: +new Date(),
                });

                resolve(true);
                return;
              }
            }
            resolve(false);
          })
          .catch(err => {
            resolve(false);
          });
      }
    });
  }

  /**
   * 通过别名查找服务器
   * @param alias
   */
  getServer(alias: string): Server {
    return this.servers.find(p => p.Alias == alias);
  }

  /**
   * 加载服务器配置
   * @param server
   */
  loadServerConfig(server: Server): Promise<any> {
    const url = server.Scheme + '://' + server.Host + (server.Port != 80 ? (':' + server.Port) : '')
      + server.AdministrationApiPath + '/configuration';

    return this.http.get(url).toPromise();

  }
}
