import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigureComponent } from './configure.component';
import { ConfigureRoutingModule } from './configure-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigureEditorComponent } from './configure-editor/configure-editor.component';
import { CodeEditorModule } from '../components/code-editor/code-editor.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,

    CodeEditorModule,
    ConfigureRoutingModule
  ],
  declarations: [ConfigureComponent, ConfigureEditorComponent]
})
export class ConfigureModule { }
