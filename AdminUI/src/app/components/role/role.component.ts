import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent extends BaseComponent implements OnInit {

  AddForm = new FormGroup({
    role_code: new FormControl(null, [Validators.required]),
    role_name: new FormControl(null, [Validators.required]),
    status: new FormControl(1),
  })

  ngOnInit(): void {
    this.getListRole();
  }

  showConfirm(id: any): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      // nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => {
        this.roleService.delete(id).subscribe(
          (res) => {
            if (res.status == 200) {
              this.toastr.success('Delete Success !');
              this.getListRole();
            }
            else {
              this.toastr.warning('Delete Fail !');
              this.getListRole();
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
      this.selected_ID = dataEdit.role_id;
      this.AddForm.patchValue({
        role_name: !dataEdit ? '' : dataEdit.role_name,
        role_code: !dataEdit ? '' : dataEdit.role_code,
        status: !dataEdit ? 1 : dataEdit.status,
      });
    }
    else {
      this.AddForm.reset();
      this.AddForm.patchValue({
        status: 1,
      });
    }
  }

  handleOk(): void {
    if (this.AddForm.valid) {
      var req = {
        role_id: this.selected_ID,
        role_code: this.AddForm.value.role_code,
        role_name: this.AddForm.value.role_name,
        status: this.AddForm.value.status,
      }
      this.roleService.save(req).subscribe(
        (res) => {
          if (res.status == 200) {
            this.toastr.success('Success !');
            this.handleCancel();
            this.getListRole();
          }
          else {
            this.toastr.success('Fail !');
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
    console.log('Button cancel clicked!');
    this.isDisplay = false;
  }
}
