import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '@shared/services/server.service';

@Component({
  selector: 'oc-home',
  templateUrl: './ocelot-home.component.html'
})
export class OcelotHomeComponent implements OnInit {

  addModalVisible = false;
  servers: Server[] = [];

  constructor(
    private fb: FormBuilder,
    private serverSev: ServerService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('com')
    this.initForm();
    this.servers = this.serverSev.servers;
  }

  initForm() {
    this.validateForm = this.fb.group({
      //'http','https'
      Scheme: ['http'],
      //'client_credentials', 'authorization_code', 'refresh_token', 'implicit'
      GrantType: ['client_credentials'],
      Alias: [null, [Validators.required]],
      Host: [null, [Validators.required]],
      Port: [80, [Validators.required]],
      ClientSecret: [null, [Validators.required]],
      AdministrationApiPath: [null, [Validators.required]]
    });
  }

  /**
   * 进入指定的服务器
   * @param server 进入的目标服务器
   */
  onEntryServer(server: Server) {
    //alert(server.Alias);
    this.serverSev.login({
      Client_Id: 'admin',
      Client_Secret: server.ClientSecret,
      Server: server
    }).then(
      res => {
        if (res) {
          this.router.navigate(['/configure/editor', { ServerAlias: server.Alias }]);

        } else {
          alert('登陆失败');
        }
      }
    );


  }
  /**
   * 删除一个服务器
   * @param server
   */
  onRemoveServer(server: Server) {
    this.serverSev.removeServer(server).then(p => {
      this.servers = this.serverSev.servers;
    }).catch(err => { });
  }

  onAddServer() {
    this.validateForm.reset();
    this.validateForm.patchValue({
      Scheme: 'http',
      GrantType: 'client_credentials',
      Port: 80
    });
    this.addModalVisible = true;
  }

  handleCancel() {
    this.addModalVisible = false;
  }

  handleOk() {
    this.submitForm();
  }

  validateForm: FormGroup;
  //horizontal \ vertical \ inline
  formLayout: string = 'horizontal';

  get isHorizontal(): boolean {
    return true;
    //return this.validateForm.controls.formLayout && this.validateForm.controls.formLayout.value === 'horizontal';
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (!this.validateForm.valid) {
      //alert('表单填写不完整');
    } else {

      this.serverSev.addServer(this.validateForm.value)
        .then(ret => {
          if (ret.Status) {
            this.addModalVisible = false;
          }
        })
        .catch(err => {
          //TODO:
        });
    }
  }
}
