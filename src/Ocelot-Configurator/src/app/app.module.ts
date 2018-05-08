import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NzGridModule } from 'ng-zorro-antd';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { ServerService } from './shared/server.service';
import { JwtModuleOptions, JwtModule } from './shared/lib/angular2-jwt/index';

/**
 * 获取当前存储的jwtToken
 * 此处用导出函数,是为修复Bug,参考:https://github.com/auth0/angular2-jwt/issues/451
 */
export function getJwtToken() {
  return localStorage.getItem('JwtToken')
}
const jwtConfig: JwtModuleOptions = {
  config: {
    skipWhenExpired: false,
    tokenGetter: getJwtToken,
    whitelistedDomains: ['localhost:5000']
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    JwtModule.forRoot(jwtConfig),

    NzGridModule,

    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ServerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
