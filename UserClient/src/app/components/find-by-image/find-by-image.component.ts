import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-find-by-image',
  templateUrl: './find-by-image.component.html',
  styleUrls: ['./find-by-image.component.css']
})
export class FindByImageComponent extends BaseComponent implements OnInit {

  displayImage: boolean = false;

  ngOnInit(): void {
    this.getListCate();
    this.getListProduct();
    this.getProductColor();
    this.getProductImage();
    this.getListAllProduct();
  }

  getListImage(cate_id: any) {
    this.listImage = this.listImageFilter;
    this.displayImage = true;
    var lstPId = this.listProduct.filter((x: any) => x.category_id == cate_id).map((p: any) => p.product_id);
    this.listImage = this.listImage.filter((m: any) => lstPId.includes(m.product_id));
  }

  passingData = (p_id: any) => {
    var p = this.listProduct.filter((x: any) => x.product_id == p_id)[0];
    var lstColor = [...new Set(this.listAllProduct.filter((x: any) => x.product_id == p.product_id).map((c: any) => c.color))];
    var lstSize = [...new Set(this.listAllProduct.filter((x: any) => x.product_id == p.product_id).map((c: any) => c.size))];

    localStorage.setItem('lstSize', JSON.stringify(lstSize));
    localStorage.setItem('lstColor', JSON.stringify(lstColor));
    // this.router.navigate(['/product-single/'+p.product_id]);
  }
}
