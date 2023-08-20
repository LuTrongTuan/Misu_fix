import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, UntypedFormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/services/app.service';
import { Renderer2 } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BrandService } from 'src/app/services/brand.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { RoleService } from 'src/app/services/role.service';
import { DiscountService } from 'src/app/services/discount.service';
import { AccountService } from 'src/app/services/account.service';
import { ExcelServicesService } from 'src/app/services/excel.service';
import { BlogService } from 'src/app/services/blog.service';
import { PositionService } from 'src/app/services/position.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

const formatDate = (date: string | number | Date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 2),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

const removeSpaces = (control: AbstractControl) => {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}

export interface OrderInfo {
  order_infor_id: number;
  phone: string;
  cusomter_type: string;
  order_code: string;
  seller: string;
  phone_seller: string;
  id_city: number | null;
  id_district: number | null;
  id_ward: number | null;
  address: string;
  coupon: number | '';
  total: number | null;
  payment_type: number | null;
  bought_type: string;
  waiting: boolean | null;
  note: string;
  data_cart: string | '';
}

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})

export class BaseComponent {

  listIndexImage: any = [{ img: '/assets/images/1.jpg', checked: false }];
  orderInfo!: any;
  Data: any;
  selected_ID: any;
  searchString: any;
  UserID_get: any;
  UserName_get: any;
  checkInsert: boolean = false;
  titleModal: any;
  submitted: boolean = false;
  numberPage: any;
  page: any = 1;
  isDisplay: boolean = false;
  isDisplayImage: boolean = false;
  isDisplayDetail: boolean = false;
  isDisplayColor: boolean = false;
  date: any = new Date();
  product_code: any;
  productFilter: any;
  listProductCart: any = [];
  listOfOption: any = [];
  isDisplayAttribute: any = false;
  customerShopping: any = '';
  order_code_search: any = '';
  customer_search: any = '';
  phone_search: any = '';
  status_search: any = null;
  payment_search: any = null;
  order_date_search: any = null;
  cancle_date_search: any = null;
  product_code_search: any = '';
  product_name_search: any = '';
  category_search: any = null;
  brand_search: any = null;
  user_name_search: any = '';
  full_name_search: any = '';
  email_search: any = '';
  listOfOptionColor: any;
  product_name: any = '';
  total: any = 0;
  
  constructor(
    public titleService: Title,
    public spinner: NgxSpinnerService,
    public router: Router,
    public fromBuilder: FormBuilder,
    public toastr: ToastrService,
    public appService: AppService,
    public renderer: Renderer2,
    public modal: NzModalService,
    public categoryService: CategoryService,
    public brandService: BrandService,
    public orderService: OrderService,
    public productService: ProductService,
    public roleService: RoleService,
    public discountService: DiscountService,
    public accountService: AccountService,
    public excelService: ExcelServicesService,
    public blogService: BlogService,
    public positionService: PositionService,
    private fb: UntypedFormBuilder,
    public notification: NzNotificationService,
  ) { }

  listCate: any = [];
  listBrand: any = [];
  listOrder: any = [];
  listProduct: any = [];
  listImage: any = [];
  listDetail: any = [];
  listColor: any = [];
  listRole: any = [];
  listDiscount: any = [];
  listAccount: any = [];
  listBlog: any = [];
  listPosition: any = [];
  listTown: any = [];
  listDistrict: any = [];
  listCity: any = [];
  listWard: any;
  citySelected: any;
  districtSelected: any;
  townSelected: any;
  sizeInput: any;
  colorInput: any;
  priceInput: any;
  amountInput: any;
  listOrderInfo: any = [];
  size_search: any = null;
  color_search: any = null;
  status_order: any = null;
  refreshOrderInfo() {
    return this.orderInfo = {
      order_infor_id: 0,
      phone: '',
      cusomter_type: '',
      order_code: '',
      seller: '',
      id_city: null,
      id_district: null,
      id_ward: null,
      address: '',
      coupon: null,
      total: 0,
      payment_type: null,
      bought_type: 'Tại cửa hàng',
      waiting: null,
      note: '',
      data_cart: ''
    }
  }
  listDistrictData: any = [];
  listWardData: any = [];
  listAttribute: any = [];

  // getDataPosition(_province_id: any, _district_id: any) {
  //   this.positionService.getListDistrict({ province_id: _province_id }).subscribe(
  //     (res: any) => {
  //       this.listDistrictData = res.data;
  //       this.positionService.getListWard({ district_id: _district_id }).subscribe(
  //         (res: any) => {
  //           this.listWardData = res.data;
  //         }
  //       );
  //     }
  //   );
  // }

  getListCity() {
    this.positionService.getListCity().subscribe(
      (res: any) => {
        this.listCity = res.data;
      }
    );
  }

  getListOrderInfo(req: any) {
    this.orderService.getOrderInfor(req).subscribe(
      (res: any) => {
        this.listOrderInfo = res.data;
      }
    );
  }

  getListDistrict(req: any) {
    this.positionService.getListDistrict(req).subscribe(
      (res: any) => {
        this.listDistrict = res.data;
      }
    );
  }

  getListWard(req: any) {
    this.positionService.getListWard(req).subscribe(
      (res: any) => {
        this.listWard = res.data;
      }
    );
  }

  getPosition() {
    this.accountService.getDataPosition().subscribe(
      (res: any) => {
        this.listPosition = res;
      }
    );
  }

  getInfo() {
    var infoUser = localStorage.getItem('UserInfo');
    return infoUser;
  }

  makeRandomeCode(length: any) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getListCate = () => {
    this.categoryService.getList().subscribe(
      (res) => {
        this.listCate = res.data;
      }
    )
  }

  getListBrand = () => {
    this.brandService.getList().subscribe(
      (res) => {
        this.listBrand = res.data;
      }
    )
  }

  getListOrder = (req: any) => {
    this.orderService.getList(req).subscribe(
      (res) => {
        this.listOrder = res.data;
        if (this.listOrder.length > 0) {
          this.listOrder.forEach((x: any) => {
            this.positionService.getListCity().subscribe(
              (res: any) => {
                x.city_name = res.data?.filter((c: any) => c.ProvinceID == x.id_city)[0]?.ProvinceName ?? "";
                this.positionService.getListDistrict({ province_id: x.id_city }).subscribe(
                  (res: any) => {
                    x.district_name = res.data?.filter((d: any) => d.DistrictID == x.id_district)[0]?.DistrictName ?? '';
                    this.positionService.getListWard({ district_id: x.id_district }).subscribe(
                      (res: any) => {
                        x.ward_name = res.data?.filter((w: any) => w.WardCode == x.id_ward.toString())[0]?.WardName ?? '';
                      }
                    );
                  }
                );
              }
            );
          });
        }
      }
    )
  }

  getListProduct = (req: any) => {
    this.productService.getList(req).subscribe(
      (res) => {
        this.listProduct = res.data;
        this.productService.getListSize().subscribe(
          (resSize) => {
            this.listOfOption = resSize.data.map((x: any) => x.size);
          }
        );
        this.productService.getListColor().subscribe(
          (resColor) => {
            this.listOfOptionColor = resColor.data.map((x: any) => x.color);
          }
        );
      }
    )
  }

  listAllProduct: any;
  getListAllProduct = () => {
    this.productService.getListAll().subscribe(
      (res) => {
        this.listAllProduct = res.data;
        this.productService.getListSize().subscribe(
          (resSize) => {
            this.listOfOption = resSize.data.map((x: any) => x.size);
          }
        );
        this.productService.getListColor().subscribe(
          (resColor) => {
            this.listOfOptionColor = resColor.data.map((x: any) => x.color);
          }
        );
      }
    )
  }

  getProductColor = () => {
    this.productService.getColor().subscribe(
      (res) => {
        this.listColor = res;
      }
    )
  };

  getProductDetail = () => {
    this.productService.getDetail().subscribe(
      (res) => {
        this.listDetail = res;
      }
    )
  };

  getProductImage = () => {
    this.productService.getImage().subscribe(
      (res) => {
        this.listImage = res.data;
      }
    )
  };


  getListRole = () => {
    this.roleService.getList().subscribe(
      (res) => {
        this.listRole = res.data;
      }
    )
  };

  getListDiscount = () => {
    this.discountService.getList().subscribe(
      (res) => {
        this.listDiscount = res.data;
      }
    )
  };

  listPhoneName: any = [];
  listSeller: any;
  getListAccount = (req: any) => {
    this.accountService.getList(req).subscribe(
      (res) => {
        this.listAccount = res.data;
        this.listSeller = this.listAccount?.map((x: any) => `${x.phone ?? 'None'} - ${x.full_name}`);
        this.orderService.getList(null).subscribe(
          (res) => {
            this.listPhoneName = [...new Set(res.data?.filter((x: any) => x.full_name != null).map((x: any) => x.full_name))] ?? [];
            this.listPhoneName = this.listPhoneName.filter((x: any) => x != 'Khách lẻ')
          }
        );
      }
    )
  };

  getAttribute = () => {
    this.productService.getAllAttribute().subscribe(
      (res) => {
        this.listAttribute = res.data;
      }
    )
  };

  listAttributeFilter: any;
  getAttributeByProduct = () => {
    this.productService.getAllAttribute().subscribe(
      (res) => {
        this.listAttribute = res.data.filter((x: any) => x.product_id == this.selected_ID);
        this.listAttributeFilter = this.listAttribute;
      }
    )
  };

  getListBlog = () => {
    this.blogService.getList().subscribe(
      (res) => {
        this.listBlog = res.data;
      }
    );
  }

  addPhoneName(): boolean {
    if (this.customerShopping) {
      if (this.customerShopping == 'Khách lẻ') {
        this.toastr.warning('Loại khách hàng này đã được thêm');
        return false;
      }

      let arr_name = this.customerShopping.split('-');
      let countDup = 0;
      this.listPhoneName?.forEach((x: any) => {
        let info = x.split('-');
        if (arr_name[0]?.trim() == info[0]?.trim() && arr_name[1]?.trim() == info[1]?.trim()) {
          countDup++;
        }
      });
      if (countDup > 0) {
        this.toastr.warning('Loại khách hàng đã được thêm');
        return false;
      }
      this.listPhoneName.push(this.customerShopping);
      this.toastr.success('Thành công');
      return false;
    }
    else {
      this.toastr.warning('Bạn chưa nhập khách hàng');
      return false;
    }
  }

  searchSeller() {
    console.log(this.orderInfo.phone_seller);
  }

  remove_sign = (str: string) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ|ị/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // huyền, sắc, hỏi, ngã, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // mũ â (ê), mũ ă, mũ ơ (ư)
    return str;
  }
}
