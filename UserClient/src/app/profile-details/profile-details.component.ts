import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../components/base/base.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent extends BaseComponent implements OnInit {

  infoUser =  JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('UserInfo'))));

  addForm = new FormGroup({
    account_id: new FormControl(this.infoUser.account_id),
    phone: new FormControl(this.infoUser?.phone, [Validators.required, Validators.pattern('^\\+?[0-9]{9,10}$')]),
    full_name: new FormControl(this.infoUser?.full_name, [Validators.required]),
    email: new FormControl(this.infoUser?.email, [Validators.required, Validators.email]),
    town_id: new FormControl(`${this.infoUser?.town_id}`),
    district_id: new FormControl(this.infoUser?.district_id),
    city_id: new FormControl(this.infoUser?.city_id),
    oldPassword: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,}$')]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,}$')]),
    confirmChangePassword: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,}$')]),
   
  })

  ngOnInit(): void {
    this.getListCity();
    this.selectCity();
    this.selectDistrict();

  }
  
  selectCity() {
    this.getListDistrict({ province_id: this.addForm.value?.city_id});
  }

  selectDistrict() {
    this.getListWard({ district_id: this.addForm.value?.district_id});
    console.log(this.listWard)
  }

  updateInfo(): any {
    if(this.addForm.invalid){
      this.addForm.markAllAsTouched();
      return;
    }
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
      if (z != null) {
        var req2 = {
          account_id: this.infoUser.account_id,
          password: this.newPassword,
          email: this.infoUser.email,
          phone: this.infoUser.phone,
          full_name: this.infoUser.full_name,
          city_id: this.citySelected,
          town_id: this.districtSelected,
          district_id: this.townSelected,

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
