import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule, NzGridModule, NzButtonModule, NzModalModule, NzFormModule, NzInputModule, NzRadioModule, NzPopconfirmModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CodeEditorComponent } from './code-editor.component';

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
    NzFormModule, NzInputModule, NzRadioModule,
  ],
  declarations: [CodeEditorComponent],
  exports: [CodeEditorComponent]
})
export class CodeEditorModule { }
