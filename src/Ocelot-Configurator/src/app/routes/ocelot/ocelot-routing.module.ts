import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OcelotHomeComponent } from './home/ocelot-home.component';
import { OcelotEditorComponent } from './editor/ocelot-editor.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: OcelotHomeComponent },
      { path: 'editor', component: OcelotEditorComponent },
    ])
  ],
  exports: [RouterModule]
})
export class OcelotRoutingModule { }
