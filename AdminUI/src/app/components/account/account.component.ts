import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends BaseComponent implements OnInit {

  AddForm = new FormGroup({
    address: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.pattern('^\\+?[0-9]{9,10}$')]),
    full_name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    admin: new FormControl(1),
    active: new FormControl(1),
    role_code: new FormControl(null, [Validators.required]),
    town_id: new FormControl(''),
    district_id: new FormControl(null),
    city_id: new FormControl(null),
    user_name: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[a-z])[a-z\d]{4,}$')]),
    password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,}$')]),
    account_code: new FormControl(null),
  })

  code_random: any;

  ngOnInit(): void {
    this.getListAccount(this.getRequest());
    this.getListRole();
    this.getPosition();
  }

  getRequest() {
    return {
      user_name: this.user_name_search,
      phone: this.phone_search,
      full_name: this.full_name_search,
      email: this.email_search
    }
  }

  showConfirm(id: any): void {
    this.modal.confirm({
      nzTitle: '<i>Bạn có muốn xóa tài khoản này không?</i>',
      // nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => {
        this.accountService.delete(id).subscribe(
          (res) => {
            if (res.status == 200) {
              this.toastr.success('Xóa thành công !');
              this.getListAccount(this.getRequest());
              this.handleCancel();
            }
            else {
              this.toastr.warning('Xóa thất bại !');
              this.getListAccount(this.getRequest());
              this.handleCancel();
            }
          }
        )
      }
    });
  }

  showAddModal(title: any, dataEdit: any): void {
    this.isDisplay = true;
    this.titleModal = dataEdit ? 'Cập nhật' : 'Thêm mới';
    this.selected_ID = 0;
    if (dataEdit != null) {
      this.selected_ID = dataEdit.account_id;
      this.AddForm.patchValue({
        address: !dataEdit ? '' : dataEdit.address,
        phone: !dataEdit ? '' : dataEdit.phone,
        full_name: !dataEdit ? '' : dataEdit.full_name,
        email: !dataEdit ? '' : dataEdit.email,
        admin: !dataEdit ? '' : dataEdit.admin,
        active: !dataEdit ? '' : dataEdit.active,
        role_code: !dataEdit ? '' : dataEdit.role_code,
        city_id: !dataEdit ? '' : dataEdit.city_id,
        town_id: !dataEdit ? '' : `${dataEdit.town_id}`,
        district_id: !dataEdit ? '' : dataEdit.district_id,
        password: !dataEdit ? '' : dataEdit.password,
        user_name: !dataEdit ? '' : dataEdit.user_name,
        account_code: !dataEdit ? '' : dataEdit.avatar,
      });
      this.getListCity();
      if(dataEdit.city_id){
        this.selectCity();
        if(dataEdit.district_id) this.selectDistrict();
      }
     
    }
    else {
      this.code_random = 'ACC_' + this.makeRandomeCode(8);
      this.AddForm.reset();
      this.AddForm.patchValue({
        account_code: this.code_random
      })
      this.getListCity();
    }
  }

  handleOk(): void {
    if (this.AddForm.valid) {
      var req = {
        account_id: this.selected_ID,
        address: this.AddForm.value.address,
        phone: this.AddForm.value.phone,
        full_name: this.AddForm.value.full_name,
        email: this.AddForm.value.email,
        admin: this.AddForm.value.admin,
        active: this.AddForm.value.active,
        role_code: this.AddForm.value.role_code,
        city_id: this.AddForm.value.city_id,
        town_id: this.AddForm.value.town_id,
        district_id: this.AddForm.value.district_id,
        user_name: this.AddForm.value.user_name,
        password: this.AddForm.value.password,
        avatar: this.AddForm.value.account_code,
      }
      this.accountService.save(req).subscribe(
        (res) => {
          if (res.status == 200) {
            this.toastr.success('Thành công !');
            this.getListAccount(this.getRequest());
            this.handleCancel();
          }
          else {
            this.toastr.success('Thất bại !');
          }
        }
      );
    } else {
      this.AddForm.markAllAsTouched();
      Object.values(this.AddForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleCancel(): void {
    this.modal.closeAll();
  }

  selectCity() {
    this.getListDistrict({ province_id: this.AddForm.value?.city_id});
  }

  selectDistrict() {
    this.getListWard({ district_id: this.AddForm.value?.district_id});
  }

  // selectCity() {
  //   this.listDistrict = this.listPosition.filter((x: any) => x.name == this.AddForm.value.city_id)[0].districts ?? null;
  // }

  // selectDistrict() {
  //   this.listTown = this.listDistrict.filter((x: any) => x.name == this.AddForm.value.district_id)[0].wards;
  // }

  search() {
    this.getListAccount(this.getRequest());
  }
}
