import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../components/base/base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {

  //Slider settings
  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };
  lstColor: any;
  lstSize: any;
  lstProductSeller: any;
  lstProductNew: any;
  options: string[] = ['One', 'Two', 'Three'];
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

  selectedPrice!: any;
  selectedBrand!: any;
  selectedCate!: any;

  ngOnInit(): void {
    this.getListCate();
    this.getListProduct();
    this.getProductImage();
    // this.getProductColor();
    this.getListProductSeller();
    this.getListBrand();
    this.getListAllProduct();
  }

  passingData(prod: any) {
    var lstColor = [...new Set(this.listAllProduct.filter((x: any) => x.product_id == prod.product_id).map((c: any) => c.color))];
    var lstSize = [...new Set(this.listAllProduct.filter((x: any) => x.product_id == prod.product_id).map((c: any) => c.size))];
    console.log(lstColor);
    console.log(lstSize);
    localStorage.setItem('lstSize', JSON.stringify(lstSize));
    localStorage.setItem('lstColor', JSON.stringify(lstColor));
  }

  getListProductSeller() {
    this.productService.getList(null).subscribe(
      (res) => {
        if (res.data?.length > 0) {
          this.lstProductSeller = res.data.sort((a: any, b: any) => (a.amount > b.amount) ? 1 : -1);
          this.lstProductSeller = this.lstProductSeller.slice(0, 5);
          this.lstProductNew = res.data.sort((a: any, b: any) => (a.product_id < b.product_id) ? 1 : -1);
          this.lstProductNew = this.lstProductNew.slice(0, 5);
        }
      }
    )
  }

  filter() {
    var req = {
      fitler_price: this.selectedPrice,
      brand_id: this.selectedBrand,
      category_id: this.selectedCate
    }
    this.productService.getList(req).subscribe(
      (res) => {
        this.listProduct = res.data;
      }
    );
  }
}
