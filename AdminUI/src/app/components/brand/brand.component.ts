import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../base/base.component';


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent extends BaseComponent implements OnInit {

  code_random: any;

  AddForm = new FormGroup({
    brand_code: new FormControl(null),
    brand_name: new FormControl(null, [Validators.required]),
    image: new FormControl(null),
    status: new FormControl(1),
  })

  ngOnInit(): void {
    this.code_random = 'BRAND_' + this.makeRandomeCode(8);
    this.getListBrand();
  }

  showConfirm(id: any): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      // nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => {
        this.brandService.delete(id).subscribe(
          (res) => {
            if (res.status == 200) {
              this.toastr.success('Delete Success !');
              this.getListBrand();
            }
            else {
              this.toastr.warning('Delete Fail !');
              this.getListBrand();
            }
          }
        )
      }
    });
  }

  showAddModal(title: any, dataEdit: any): void {
    this.isDisplay = true;
    this.titleModal = title;
    this.selected_ID = 0;
    if (dataEdit != null) {
      this.selected_ID = dataEdit.brand_id;
      this.AddForm.patchValue({
        brand_name: !dataEdit ? '' : dataEdit.brand_name,
        brand_code: !dataEdit ? '' : dataEdit.brand_code,
        image: !dataEdit ? '' : dataEdit.image,
        status: !dataEdit ? 1 : dataEdit.status,
      });
    }
    else {
      this.AddForm.reset();
      this.AddForm.patchValue({
        status: 1,
        brand_code: this.code_random
      });
    }
  }

  handleOk(): void {
    if (this.AddForm.valid) {
      var req = {
        brand_id: this.selected_ID,
        brand_code: this.AddForm.value.brand_code,
        brand_name: this.AddForm.value.brand_name,
        image: this.AddForm.value.image,
        status: this.AddForm.value.status,
      }
      this.brandService.save(req).subscribe(
        (res) => {
          if (res.status == 200) {
            this.toastr.success('Success !');
            this.handleCancel();
            this.getListBrand();
          }
          else {
            this.toastr.success('Fail !');
          }
        }
      );
    }
    else {
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
