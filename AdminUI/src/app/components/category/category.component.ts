import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent extends BaseComponent implements OnInit {

  code_random: any;

  AddForm = new FormGroup({
    category_code: new FormControl(null),
    category_name: new FormControl(null, [Validators.required]),
    status: new FormControl(1),
  })

  ngOnInit(): void {
    this.code_random = 'CATE_'+this.makeRandomeCode(8);
    this.getListCate();
  }

  showConfirm(id: any): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      // nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => {
        this.categoryService.delete(id).subscribe(
          (res) => {
            if (res.status == 200) {
              this.toastr.success('Delete Success !');
              this.getListCate();
            }
            else {
              this.toastr.warning('Delete Fail !');
              this.getListCate();
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
      this.selected_ID = dataEdit.category_id;
      this.AddForm.patchValue({
        category_name: !dataEdit ? '' : dataEdit.category_name,
        category_code: !dataEdit ? '' : dataEdit.category_code,
        status: !dataEdit ? 1 : dataEdit.status,
      });
    }
    else {
      this.AddForm.reset();
      this.AddForm.patchValue({
        status: 1,
        category_code: this.code_random
      });
    }
  }

  handleOk(): void {
    if (this.AddForm.valid) {
      var req = {
        category_id: this.selected_ID,
        category_code: this.AddForm.value.category_code,
        category_name: this.AddForm.value.category_name,
        status: this.AddForm.value.status,
      }
      this.categoryService.save(req).subscribe(
        (res) => {
          if (res.status == 200) {
            this.toastr.success('Success !');
            this.handleCancel();
            this.getListCate();
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
