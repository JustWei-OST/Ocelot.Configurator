import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigureComponent } from './configure.component';
import { ConfigureRoutingModule } from './configure-routing.module';
import { NzCardModule, NzGridModule, NzButtonModule, NzModalModule, NzFormModule, NzInputModule, NzRadioModule, NzPopconfirmModule, NzCollapseModule, NzTabsModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigureEditorComponent } from './configure-editor/configure-editor.component';
import { CodeEditorModule } from '../components/code-editor/code-editor.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzCardModule,
    NzGridModule,
    NzButtonModule,
    NzModalModule,
    NzPopconfirmModule,
    NzFormModule, NzInputModule, NzRadioModule, NzCollapseModule, NzTabsModule,
    CodeEditorModule,
    ConfigureRoutingModule
  ],
  declarations: [ConfigureComponent, ConfigureEditorComponent]
})
export class ConfigureModule { }
