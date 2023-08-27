import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../components/base/base.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit {

  listProductByCate : any;

  dataAccount = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('UserInfo'))));

  ngOnInit(): void {
    this.getListCate();
    this.getToken();
    this.getListProduct();
    this.getListCart()
    
  }

  getListCart(){
    this.cartInfo = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('Cart'))));

    const currentTime = new Date().getTime();
    const expirationTime = 5 * 60 * 1000; // 5 phút tính bằng mili giây

    if(this.cartInfo?.filter((x: any) => x.createdTime) != ''){
      if(this.cartInfo?.filter((x: any) => (currentTime - x.createdTime) > expirationTime) != ''){
        var req = {
          full_name: null,
          address: null,
          phone: null,
          note: null,
          order_item: JSON.stringify(this.cartInfo),
          type_payment: null,
          status: null,
          account_id: null,
          fee_ship: null,
          id_city: null,
          id_district: null,
          id_ward: null,
          total: null,
          type: null,
        }
        this.productService.increasesAmountCart(req).subscribe();
      }
      
    }

    this.cartInfo = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('Cart'))));

    this.cartInfo = this.cartInfo?.filter((x: any) => (currentTime - x.createdTime) < expirationTime);
    localStorage.setItem('Cart', JSON.stringify(this.cartInfo));

    this.cartInfo =  this.cartInfo?.filter((c: any) => c. account_id === this.dataAccount.account_id);
   
    this.cartInfo?.forEach((c: any) => {
      this.totalPrice += c.amountCart * c.price;
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
          this.cartInfo = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('Cart'))));
          this.cartInfo = this.cartInfo.filter((x: any) => x.id != item.id);
          this.totalPrice -= item.amountCart * item.price;
          localStorage.setItem('Cart', JSON.stringify(this.cartInfo));
          this.toastr.success('Thành công !');
          setTimeout(window.location.reload.bind(window.location), 350);
        }
        else {
          this.toastr.success('Thất bại !');
        }
      }
    );
  }

  logout() {
    localStorage.removeItem('UserInfo');
    this.toastr.success('Đăng xuất thành công !');
    this.token = null;
    setTimeout(window.location.reload.bind(window.location), 350);
  }
}
