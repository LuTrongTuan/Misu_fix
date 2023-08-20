import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../components/base/base.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit {

  listProductByCate : any;
  userInfo: any;

  ngOnInit(): void {
    this.getListCate();
    this.getToken();
    this.getListProduct();
    this.userInfo = localStorage.getItem('UserInfo');
    this.cartInfo = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('Cart'))));
    this.cartInfo.forEach((c: any) => {
      this.totalPrice += c.count * c.price;
    })
  }

  reloadPage (id: any, name: any) {
    window.location.href = '/#/shop/';
    setTimeout(window.location.reload.bind(window.location), 250);
    localStorage.setItem('cate_id', id);
    localStorage.setItem('cate_name', name);
  }

  removeCartItem = (item: any) => {
    var p = this.listProduct.filter((x: any) => x.product_id == item.product_id)[0];
    var reqProd = {
      product_id: p.product_id,
      amount:  parseInt(p.amount)  + parseInt(item.count),
      brand_id: p.brand_id,
      category_id: p.category_id,
      gender: p.gender,
      origin: p.origin,
      product_name: p.product_name,
      status: p.status,
      price: p.price,
      size: p.size
    }
    this.productService.save(reqProd).subscribe(
      (res) => {
        if (res) {
          this.cartInfo = this.cartInfo.filter((x: any) => x.id != item.id);
          this.totalPrice -= item.count * item.price;
          localStorage.setItem('Cart', JSON.stringify(this.cartInfo));
        }
        else {
          this.toastr.success('Fail !');
        }
      }
    );
  }

  logout() {
    localStorage.removeItem('UserInfo');
    this.toastr.success('Đăng xuất thành công !');
    this.token = null;
  }
}
