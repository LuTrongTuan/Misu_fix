import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss']
})
export class CreateNewComponent extends BaseComponent implements OnInit {

  index = 0;
  tabs = [
    {
      name: 'Hóa đơn 1',
    }
  ];
  selectedOption: any;
  waitingPayment: any;
  paymentMethod: any;
  listDistrictFilter: any;
  listWardFilter: any;
  totalPayment: any = 0;
  full_name: string = '';
  closeTab({ index }: { index: number }): void {
    this.tabs.splice(index, 1);
  }

  newTab(): void {
    if (this.tabs.length > 4) {
      this.toastr.warning('Bạn chỉ được tạo tối đa 5 hóa đơn');
    }
    else {
      let tab = {
        name: 'Hóa đơn ' + (this.tabs.length + 1),
      };
      this.tabs.push(
        tab
      );
      this.refreshOrderInfo();
      this.orderInfo.order_code = `HD${this.date.getDate()}${this.date.getMonth() + 1}${this.date.getFullYear()}${Math.random()}`;
      this.index = this.tabs.length - 1;
    }
  }

  ngOnInit(): void {
    this.getListCity();
    this.getListProduct(null);
    this.getListAccount(null);
    this.refreshOrderInfo();
    this.getListAllProduct();
    this.orderInfo.bought_type = 'offline';
    this.orderInfo.order_code = `HD${this.date.getDate()}${this.date.getMonth() + 1}${this.date.getFullYear()}${Math.random()}`;
    const data = localStorage.getItem('UserInfo');
    if (data) {
      const account = JSON.parse(data);
      this.full_name = account.full_name;
    }
  }

  selectCity() {
    this.getListDistrict({ province_id: this.citySelected });
    this.orderInfo.id_city = this.citySelected;
  }

  selectDistrict() {
    this.getListWard({ district_id: this.districtSelected });
    this.orderInfo.id_district = this.districtSelected;
  }

  selectWard() {
    this.orderInfo.id_ward = this.townSelected;
  }

  addToCart(): boolean {
    this.productFilter = this.listAllProduct;
    if (this.product_code) {
      this.productFilter = this.productFilter.filter((x: any) => x.product_code == this.product_code);
    }
    if (this.product_name) {
      this.productFilter = this.productFilter.filter((x: any) => x.product_name.toLowerCase().includes(this.product_name));
    }
    if (this.size_search) {
      this.productFilter = this.productFilter.filter((x: any) => x.size == this.size_search);
    }
    if (this.colorInput) {
      this.productFilter = this.productFilter.filter((x: any) => x.color == this.colorInput);
    }
    let listAttributeCartId = this.listProductCart.map((x: any) => x.product_attribue_id) ?? [];
    for (let att of this.productFilter) {
      if (!listAttributeCartId.includes(att.product_attribue_id)) {
        if (this.productFilter) {
          this.productFilter.forEach((p: any) => {
            p.checked = false;
            p.amountCart = 1;
            p.totalPayment = 0;
            p.totalPayment = (p.price * p.amountCart);
            this.listProductCart.push(p);
          })
          this.totalPayment = this.listProductCart?.filter((x: any) => x.checked == true)?.map((o: any) => o.totalPayment)?.reduce((a: any, c: any) => { return a + c }) ?? 0;
        }
        else {
          this.toastr.warning('Không tìm thấy sản phẩm nào phù hợp');
        }
      }
      else {
        this.toastr.warning('Bạn đã thêm sản phẩm này rồi');
      }
    }

    return true;
  }

  deleteCart(data: any) {
    this.listProductCart = this.listProductCart.filter((x: any) => x.product_attribue_id != data.product_attribue_id);
    if (data.checked) {
      this.totalPayment -= data.totalPayment;
    }
  }

  checkAmount(data: any) {
    if (data.amountCart > data.amount) {
      this.toastr.warning('Số lượng sản phẩm cần mua đã vượt quá số lượng trong kho');
      data.amountCart = 1;
      return;
    }
  }

  changeAmount(data: any) {
    data.totalPayment = data.price * data.amountCart;
    if (!data.checked) {
      this.totalPayment -= data.totalPayment;
    }
    this.totalPayment = this.listProductCart.filter((x: any) => x.checked == true).map((o: any) => o.totalPayment).reduce((a: any, c: any) => { return a + c });
  }

  createOrder(): boolean {
    if (!this.listProductCart || !(this.totalPayment > 0)) {
      this.toastr.warning('Bạn chưa chọn sản phẩm');
      return false;
    }
    if (!this.orderInfo.full_name || !this.orderInfo.payment_type || !this.orderInfo.bought_type) {
      if (this.orderInfo.bought_type == 'offline') {
        this.toastr.warning('Bạn chưa nhập đủ thông tin');
        return false;
      }
      if (this.orderInfo.bought_type == 'online') {
        if (!this.citySelected || !this.districtSelected) {
          this.toastr.warning('Bạn chưa nhập đủ thông tin');
          return false;
        }
      }
    }
    if (this.orderInfo.status) {
      this.orderInfo.status = 5
    } else {
      this.orderInfo.status = 3
    }
    this.orderInfo.seller = this.full_name;
    this.orderInfo.total = this.totalPayment;
    this.orderInfo.order_item = JSON.stringify(this.listProductCart.filter((x: any) => x.checked == true));
    this.orderInfo.type = 2;
    this.orderService.createOrderInfor(this.orderInfo).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.toastr.success('Thành công !');
          this.refreshOrderInfo();
        }
        else {
          this.toastr.warning('Thất bại !');
        }
      }
    );
    return true;
  }
}
