import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerService } from '@shared/services/server.service';

@Component({
  selector: 'oc-ocelot-editor',
  templateUrl: './ocelot-editor.component.html'
})
export class OcelotEditorComponent implements OnInit {

  serverAlias: string;
  server: Server;
  config: any;

  configStr: string;

  constructor(
    private serverSev: ServerService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.serverAlias = this.route.snapshot.paramMap.get('ServerAlias');
    this.server = this.serverSev.getServer(this.serverAlias);

    this.serverSev.loadServerConfig(this.server).then(p => {
      this.config = p
      this.initEditor();
    });
  }

  initEditor() {
    this.configStr = JSON.stringify(this.config, null, 2)
  }

  onConfigChange(evt) {
    try {
      this.config = JSON.parse(evt);
    } catch (e) {
      //TODO:
      console.error(e)
    }
  }
}
