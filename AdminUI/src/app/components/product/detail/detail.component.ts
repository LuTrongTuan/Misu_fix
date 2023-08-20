import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends BaseComponent implements OnInit {

  @Input() id_input: any = 0; 
  dataDetail: any = [];

  ngOnInit(): void {
    this.getListDetail();
  }

  AddForm = new FormGroup({
    detail: new FormControl(null, [Validators.required]),
  })

  getListDetail() {
    this.productService.getDetail().subscribe(
      (res) => {
        this.dataDetail = res.data.filter((x: any) => x.product_id == this.id_input);
      }
    );
  }

  addDetail() {
    if (this.AddForm.invalid) {
      this.AddForm.markAllAsTouched();
      return;
    }
    let req = {
      product_id: this.id_input,
      detail: this.AddForm.value.detail
    }
    this.productService.insertDetail(req).subscribe(
      (res) => {
        if (res.status == 200) {
          this.toastr.success('Success !');
          this.getListDetail();
        }
        else {
          this.toastr.success('Failed !');
        }
      }
    );
  }

  showConfirm(id: any): void {
    this.productService.deleteDetail(id).subscribe(
      (res) => {
        if (res) {
          this.toastr.success('Delete Success !');
          this.getListDetail();
        }
        else {
          this.toastr.warning('Delete Fail !');
          this.getListDetail();
        }
      }
    )
  }
}
