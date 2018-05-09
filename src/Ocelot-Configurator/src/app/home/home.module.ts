import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NzCardModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    NzCardModule,

    HomeRoutingModule,
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
