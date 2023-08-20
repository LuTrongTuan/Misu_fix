import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../components/base/base.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent extends BaseComponent implements OnInit {

  emailFindPass: any;

  ngOnInit(): void {
  }

  findPass() {
    var req = {
      recipient: this.emailFindPass,
      msgBody: "HELLO WORLD !",
      subject: "Find Password"
  }
    this.Acc.findPass(req).subscribe(
      (res) => {
        if (res == 200) {
          this.toastr.success("Thành công. Thông tin đăng nhập đã được gửi vào mail của bạn");
        }
        else {
          this.toastr.warning("Gửi mail thất bại. Email k được đăng kí !");
        }
      }
    );
  }
}
