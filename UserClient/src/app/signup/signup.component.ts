import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../components/base/base.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent extends BaseComponent implements OnInit {

  AddForm = new FormGroup({
    email: new FormControl(null, Validators.required),
    user_name: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    confirm_password: new FormControl(null, Validators.required),
  })
  
  ngOnInit(): void {
  }

  register(): any {
    let req = {
      email: this.AddForm.value.email,
      user_name: this.AddForm.value.user_name,
      password: this.AddForm.value.password,
      confirm_password: this.AddForm.value.confirm_password,
      admin: false,
      active: true,
      role_code: "003"
    }

    if (this.AddForm.invalid) {
      this.toastr.warning('Vui lòng nhập đầy đủ thông tin !');
      return false;
    }
    if (req.password != req.confirm_password) {
      this.toastr.warning('Xác nhận mật khẩu chưa đúng !');
      return false
    }

    this.accService.register(req).subscribe(
      (res) => {
        if (res) {
          setTimeout(()=>this.router.navigate(['/']), 1000);
          this.toastr.success('Đăng kí thành công. Bạn có thể đăng nhập tài khoản ngay bây giờ !');
        }
        else {
          this.toastr.warning('Đăng kí thất bại !');
        }
      }
    );
  }
}
