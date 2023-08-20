import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../components/base/base.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent extends BaseComponent implements OnInit {

  paymentType: any;
  checkRole: any;
  service_id: any;
  full_name: any;
  city: any;
  address: any;
  phone: any;
  note: any;

  ngOnInit(): void {
    this.getListCity();
    this.cartInfo = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('Cart'))));
    this.cartInfo.forEach((c: any) => {
      this.totalPrice += c.count * c.price;
    })
  }

  selectCity() {
    this.getListDistrict({ province_id: this.citySelected });
  }

  selectDistrict() {
    this.getListWard({ district_id: this.districtSelected });
  }

  payment() {
    if (this.checkRole) {
      var req = {
        full_name: this.full_name,
        address: this.address,
        phone: this.phone,
        note: this.note,
        order_item: JSON.stringify(this.cartInfo),
        type_payment: 1,
        status: 0,
        account_id: JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('UserInfo')))).account_id,
        fee_ship: this.feeShip,
        id_city: this.citySelected,
        id_district: this.districtSelected,
        id_ward: this.townSelected,
        total: this.totalPrice,
        type: 1,
      }
      this.orderService.insert(req).subscribe(
        (res) => {
          if (res) {
            this.toastr.success('Thành công !');
            localStorage.removeItem('Cart');
            this.router.navigate(['/']);
            setTimeout(window.location.reload.bind(window.location), 250);
          }
          else {
            this.toastr.warning('Thất bại !');
          }
        }
      );
    }
    else {
      this.toastr.warning('Bạn chưa đồng ý với các điểu khoản !');
    }
  }

  getPaymentShipper() {

    // var req = {
    //   service_id: null,
    //   service_type_id: this.service_id,
    //   insurance_value: this.totalPrice,
    //   coupon: null,
    //   to_ward_code: this.townSelected,
    //   to_district_id: this.districtSelected,
    //   from_district_id: 1542,
    //   height: 100,
    //   length: 15,
    //   weight: 1000,
    //   width: 15
    // };
    this.positionService.getShipPayment({
      "service_id": 100039,
      // "insurance_value": this.totalPrice,
      "coupon": null,
      "from_district_id": 1542,
      "to_district_id": this.districtSelected,
      "to_ward_code": this.townSelected,
      "height": 5,
      "length": 5,
      "weight": 100,
      "width": 5
    }).subscribe(
      (res: any) => {
        this.feeShip = res.data.total;
      }
    );
  }
}
