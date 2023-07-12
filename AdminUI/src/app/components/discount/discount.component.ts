import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent extends BaseComponent implements OnInit {

  AddForm = new FormGroup({
    discount_code: new FormControl(null, [Validators.required]),
    discount_name: new FormControl(null, [Validators.required]),
    value: new FormControl(null, [Validators.required]),
    start_date: new FormControl(null, [Validators.required]),
    end_date: new FormControl(null, [Validators.required]),
    status: new FormControl(1),
  })

  ngOnInit(): void {
    this.getListDiscount();
  }

  showConfirm(id: any): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      // nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => {
        this.discountService.delete(id).subscribe(
          (res) => {
            if (res) {
              this.toastr.success('Delete Success !');
              this.getListDiscount();
            }
            else {
              this.toastr.warning('Delete Fail !');
              this.getListDiscount();
            }
          }
        )
      }
    });
  }

  showAddModal(title: any, dataEdit: any): void {
    this.isDisplay = true;
    this.titleModal = !dataEdit ? 'Thêm mới' : 'Cập nhật';
    this.selected_ID = 0;
    if (dataEdit != null) {
      this.selected_ID = dataEdit.discount_id;
      this.AddForm.patchValue({
        discount_code: !dataEdit ? '' : dataEdit.discount_code,
        discount_name: !dataEdit ? '' : dataEdit.discount_name,
        value: !dataEdit ? '' : dataEdit.value,
        end_date: !dataEdit ? '' : dataEdit.end_date,
        start_date: !dataEdit ? '' : dataEdit.start_date,
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
        discount_id: this.selected_ID,
        discount_code: this.AddForm.value.discount_code,
        discount_name: this.AddForm.value.discount_name,
        value: this.AddForm.value.value,
        created_at: new Date(),
        end_date: this.AddForm.value.end_date,
        start_date: this.AddForm.value.start_date,
        status: this.AddForm.value.status,
      }
      this.discountService.save(req).subscribe(
        (res) => {
          if (res) {
            this.toastr.success('Success !');
            this.handleCancel();
            this.getListDiscount();
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
