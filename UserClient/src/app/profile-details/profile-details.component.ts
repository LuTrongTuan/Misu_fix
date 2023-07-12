import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../components/base/base.component';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent extends BaseComponent implements OnInit {

  infoUser: any;
  ngOnInit(): void {
    this.infoUser = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('UserInfo'))));
  }

  updateInfo(): any {
    var req = {
      account_id: this.infoUser.account_id,
      user_name: this.infoUser.user_name,
      password: this.oldPassword,
      email: this.infoUser.email
    }
    if (!this.oldPassword && !this.confirmChangePassword) {
      this.toastr.warning('Bạn cần nhập đầy đủ thông tin !');
      return false;
    } 
    else if (this.newPassword != this.confirmChangePassword) {
      this.toastr.warning('Xác nhận mật khẩu không chính xác !');
      return false;
    }
    this.Acc.login(req).subscribe((z) => {
      if (z) {
        var req2 = {
          account_id: this.infoUser.account_id,
          user_name: this.infoUser.user_name,
          password: this.newPassword,
          email: this.infoUser.email
        }
        this.Acc.updatePassword(req2).subscribe((res) => {
          if (res) {
            this.toastr.success('Cập nhật thông tin thành công !');
            localStorage.setItem('UserInfo', JSON.stringify(this.infoUser));
          }
          else {
            this.toastr.success('Cập nhật thông tin thất bại !');
          }
        });
      }
      else {
        this.toastr.warning('Tên TK hoặc mật khẩu cũ chưa chính xác !');
      }
    });
  }
}
