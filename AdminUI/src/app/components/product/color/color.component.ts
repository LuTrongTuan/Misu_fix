import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent extends BaseComponent implements OnInit {

  @Input() id_input: any = 0; 
  dataColor: any = [];
  _color: any;

  ngOnInit(): void {
    this.getListColor();
  }

  getListColor() {
    this.productService.getColor().subscribe(
      (res) => {
        this.dataColor = res.data.filter((x: any) => x.product_id == this.id_input);
      }
    );
  }

  addColor() {
    let req = {
      product_id: this.id_input,
      color: this._color
    }
    this.productService.insertColor(req).subscribe(
      (res) => {
        if (res.status == 200) {
          this.toastr.success('Success !');
          this.getListColor();
        }
        else {
          this.toastr.warning('Failed !');
        }
      }
    );
  }

  showConfirm(id: any): void {
    this.productService.deleteColor(id).subscribe(
      (res) => {
        if (res.status == 200) {
          this.toastr.success('Delete Success !');
          this.getListColor();
        }
        else {
          this.toastr.warning('Delete Fail !');
          this.getListColor();
        }
      }
    )
  }
}
