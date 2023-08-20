import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { RequestLogin } from '../models/inputModels/RequestLogin';
import { ResponseLogin } from '../models/outputModels/ResponseLogin';
import { AccService } from '../services/acc.service';
import { AppService } from '../services/app.service';
import { common } from '../commons/app.common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    user_name: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  m: RequestLogin | undefined;
  LoginResult: ResponseLogin | undefined;

  constructor(
    private renderer: Renderer2,
    private appService: AppService,
    private http: HttpClient,
    private cookieService: CookieService,
    private Acc: AccService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  
  ngOnInit(): void {
    this.renderer.addClass(document.body, 'login-page');
    this.m = new RequestLogin();
    this.cookieService.deleteAll;
    this.LoginResult = new ResponseLogin();

  }

  Ridrect() {
    this.appService.login();
  }

  logIn() {
    if (this.loginForm?.valid) {
      let req = {
        user_name: this.loginForm.value.user_name,
        password: this.loginForm.value.password,
      };
      this.Acc.login(req).subscribe((z) => {
        if (z.status == 200) {
          localStorage.setItem('UserInfo', JSON.stringify(z.data));
          this.appService.login();
          this.toastr.success('Đăng nhập thành công !');
          setTimeout(()=>this.router.navigate(['/']), 1000);
          setTimeout(()=>window.location.reload(), 1000);
        } else {
          this.toastr.warning('Thông tin đăng nhập không chính xác !');
          localStorage.removeItem('UserInfo');
        }
      });
    } else {
      this.toastr.warning('Vui lòng nhập đầy đủ thông tin !');
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'login-page');
  }
}
