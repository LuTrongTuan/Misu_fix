import { Component, OnInit, OnDestroy, Renderer2,NgModule } from '@angular/core';
import { AccService } from 'src/app/services/acc.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from 'src/app/services/app.service';
import { RequestLogin } from 'src/app/models/inputModels/RequestLogin';
import { ResponseLogin } from 'src/app/models/outputModels/ResponseLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

  requestLogin = new RequestLogin();

  LoginForm = new FormGroup({
    UserName: new FormControl(null, Validators.required),
    Password: new FormControl(null, Validators.required),
  });

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private AppService: AppService,
    private cookieService: CookieService,
    private spinner: NgxSpinnerService,
    private AccService: AccService
  ) {}

  ngOnInit() {
    this.renderer.addClass(document.body, 'login-page');
    this.cookieService.deleteAll;
  }

  Ridrect() {
    this.AppService.login();
  }

  logIn() {
    this.spinner.show();
    if (this.LoginForm.valid) {
      this.requestLogin.UserName = this.LoginForm.value.UserName;
      this.requestLogin.Password = this.LoginForm.value.Password;
      let req = {
        UserName: this.requestLogin.UserName,
        Password: this.requestLogin.Password,
      };
      this.AccService.login(req).subscribe((res) => {
        if (res.StatusCode == 200) {
          this.toastr.success('Login Successfully !');
          var info = res.Data.UserInfo;
          localStorage.setItem('AccountInfo', JSON.stringify(info).toString());
          this.AppService.login();
          this.spinner.hide();
        } else {
          this.toastr.error(res.Message, 'Failed !');
          localStorage.removeItem('AccountInfo');
          this.spinner.hide();
        }
      });
    } else {
      this.toastr.error('Fill all blank Input', 'Failed !');
      this.spinner.hide();
    }
  }
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'login-page');
  }
}
