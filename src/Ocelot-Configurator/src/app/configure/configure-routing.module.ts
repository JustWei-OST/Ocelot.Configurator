import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfigureComponent } from './configure.component';
import { ConfigureEditorComponent } from './configure-editor/configure-editor.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: ConfigureComponent },
      { path: 'editor', component: ConfigureEditorComponent },
    ])
  ],
  exports: [RouterModule]
})
export class ConfigureRoutingModule { }
