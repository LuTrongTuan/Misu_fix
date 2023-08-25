import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../components/base/base.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent extends BaseComponent implements OnInit {

  carts: any = [];
  dataAccount = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('UserInfo'))));

  ngOnInit(): void {
    this.getListCart();
  }

  getListCart(){
    this.cartInfo = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('Cart'))));

    const currentTime = new Date().getTime();
    const expirationTime = 3 * 60 * 1000; // 5 phút tính bằng mili giây
    console.log(this.cartInfo.filter((x: any) => (currentTime - x.createdTime) > expirationTime))
   

    if(this.cartInfo.filter((x: any) => x.createdTime) != ''){
      if(this.cartInfo.filter((x: any) => (currentTime - x.createdTime) > expirationTime) != ''){
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

    this.cartInfo = this.cartInfo.filter((x: any) => (currentTime - x.createdTime) < expirationTime);

    localStorage.setItem('Cart', JSON.stringify(this.cartInfo));

    this.cartInfo =  this.cartInfo.filter((c: any) => c. account_id === this.dataAccount.account_id);
   
    this.cartInfo.forEach((c: any) => {
      this.totalPrice += c.amountCart * c.price;
    })
  }

  removeCartItem = (item: any) => {
    var userConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này ra khỏi đơn hàng không?");
    if(userConfirm){
      this.cartInfo = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('Cart'))));
      this.cartInfo = this.cartInfo.filter((x: any) => x.id != item.id);
      this.totalPrice -= item.amountCart * item.price;
      localStorage.setItem('Cart', JSON.stringify(this.cartInfo));
      this.cartInfo =  this.cartInfo.filter((c: any) => c. account_id === this.dataAccount.account_id);
   
      this.totalPrice = item.amountCart * item.price;
      this.productService.increaseAmount(item).subscribe();
      this.toastr.success('Thành công !');
      setTimeout(window.location.reload.bind(window.location), 350);
    }
   
  }
  checkValue(event: any, index: number) {
    const inputValue = event.target.value;
    this.cartInfo[index].value = inputValue;
    console.log(this.cartInfo[index])
    if(inputValue <= 0) this.toastr.warning('Số lượng không được nhỏ hơn hoặc bằng 0 !');

    this.productService.getProductAttribute(this.cartInfo[index].product_attribue_id).subscribe(
      (res) => {
        if (inputValue > res.data?.amount) {
          this.toastr.warning('Số lượng bạn chọn lớn hơn số lượng trong kho!');
        
        }})

  }

  updateCountCart(cart: any) {
    this.cartInfo = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('Cart'))));
    this.cartInfo.forEach((x: any) => {
      if (x.id == cart.id) {
        this.productService.getProductAttribute(cart.product_attribue_id).subscribe(
          (res) => {
            if (cart.amountCart > res.data?.amount) {
              this.cartInfo =  this.cartInfo.filter((c: any) => c. account_id === this.dataAccount.account_id);
              this.toastr.warning('Số lượng bạn chọn lớn hơn số lượng trong kho!');
            
            }
            else{
              x.amountCart = cart.amountCart;
              x.total = `${cart.amountCart} x ${cart.price}`;
              localStorage.setItem('Cart', JSON.stringify(this.cartInfo));
              
              this.cartInfo =  this.cartInfo.filter((c: any) => c. account_id === this.dataAccount.account_id);
   
              this.totalPrice = cart.amountCart * cart.price;

              this.toastr.success('Thêm số lượng sản phẩm thành công');
              setTimeout(window.location.reload.bind(window.location), 600);
            }
          }
        )
      }
    });
  }
}

