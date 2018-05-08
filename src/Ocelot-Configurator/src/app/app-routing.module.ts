import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  //{ path: '', component: HomeComponent, },
  { path: 'home',  loadChildren: './home/home.module#HomeModule' },
  { path: 'configure', loadChildren: './configure/configure.module#ConfigureModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
