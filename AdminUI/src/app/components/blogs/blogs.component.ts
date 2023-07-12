import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent extends BaseComponent implements OnInit {

  dataBlog: any;
  isDisplayContent: any;

  AddForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    descrip: new FormControl(null, Validators.required),
  })

  ngOnInit(): void {
    this.getListBlog();
  }

  addBlog() {
    console.log(this.dataBlog);
  }

  showConfirm(id: any): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      // nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => {
        this.blogService.delete(id).subscribe(
          (res) => {
            if (res.status == 200) {
              this.toastr.success('Delete Success !');
              this.getListBlog();
            }
            else {
              this.toastr.warning('Delete Fail !');
              this.getListBlog();
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
    this.AddForm.reset();
    this.dataBlog = null;
  }

  handleOk(): void {
    if (this.AddForm.valid) {
      var req = {
        title: this.AddForm.value.title,
        descript: this.AddForm.value.descrip,
        content_html: this.dataBlog,
      }
      this.blogService.save(req).subscribe(
        (res) => {
          if (res.status == 200) {
            this.toastr.success('Success !');
            this.handleCancel();
            this.getListBlog();
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
    this.isDisplayContent = false;
  }

  showContentModal(dataEdit: any): void {
    this.isDisplayContent = true;
    this.dataBlog = dataEdit;
  }
}
