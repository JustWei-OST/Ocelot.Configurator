import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { ServerService } from '@shared/services/server.service';
import { OcelotRoutingModule } from './ocelot-routing.module';
import { OcelotHomeComponent } from './home/ocelot-home.component';
import { OcelotEditorComponent } from './editor/ocelot-editor.component';

@NgModule({
  imports: [
    SharedModule,
    NgZorroAntdModule,
    OcelotRoutingModule
  ],
  declarations: [OcelotHomeComponent, OcelotEditorComponent],
  providers: [ServerService]
})
export class OcelotModule { }
