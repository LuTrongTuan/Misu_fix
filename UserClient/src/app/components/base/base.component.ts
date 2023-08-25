import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { Renderer2 } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { BrandService } from 'src/app/services/brand.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { common } from 'src/app/commons/app.common';
import { AccService } from 'src/app/services/acc.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommentService } from 'src/app/services/comment.service';
import { BlogComponent } from 'src/app/blog/blog.component';
import { BlogService } from 'src/app/services/blog.service';
import { PositionService } from 'src/app/services/position.service';

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

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})

export class BaseComponent {

  countPage = 1;
  Data: any;
  selected_ID: any;
  searchString: any;
  UserID_get: any;
  UserName_get: any;
  checkInsert: boolean = false;
  titleModal: any;
  submitted: boolean = false;
  numberPage: any;
  isDisplay: boolean = false;
  isDisplayImage: boolean = false;
  isDisplayDetail: boolean = false;
  isDisplayColor: boolean = false;
  cart: any = [];
  countCart: any;
  cartInfo: any = [];
  totalPrice: any = 0;
  token: any = this.getToken();
  user_id: any;
  user_name: any;
  com: common | undefined;
  oldPassword: any;
  newPassword: any;
  confirmChangePassword: any;
  email: any;
  listComment: any;
  citySelected: any;
  districtSelected: any;
  townSelected: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  feeShip: any = 0;

  constructor(
    public titleService: Title,
    public router: Router,
    public fromBuilder: FormBuilder,
    public appService: AppService,
    public renderer: Renderer2,
    public categoryService: CategoryService,
    public brandService: BrandService,
    public orderService: OrderService,
    public productService: ProductService,
    public route: ActivatedRoute,
    public accService: AccService,
    public toastr: ToastrService,
    public modalService: NgbModal,
    public Acc: AccService,
    public commentService: CommentService,
    public blogService: BlogService,
    public positionService: PositionService,
  ) { }

  listCate: any = [];
  listBrand: any = [];
  listOrder: any = [];
  listProduct: any = [];
  listImage: any = [];
  listDetail: any = [];
  listColor: any = [];
  listImageFilter: any = [];
  listBlog: any = [];
  listSize: any = [];
  listSizeFilter: any = [];
  listCity: any;
  listDistrict: any;
  listWard: any;

  dissmissModal() {
    this.modalService.dismissAll('');
  }

  public getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getToken() {
    this.com = new common(this.router);
    this.com.CheckLogin();
    var a = this.com.getUserinfo();
    this.token = a?.token ?? null;
    this.user_id = a?.user_id;
    this.user_name = a?.user_name;
    return a?.token;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  getImageProduct = (p_id: any) => {
    var img = this.listImage.filter((x: any) => x.product_id == p_id)[0]?.image ?? 'https://www.berchielli.co.uk/wp-content/themes/barberry/images/placeholder.jpg';
    return `http://localhost:4200${img}`;
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

  getListOrder = () => {
    this.orderService.getList(null).subscribe(
      (res) => {
        this.listBrand = res.data;
      }
    )
  }

  getListProduct = () => {
    this.productService.getList(null).subscribe(
      (res) => {
        this.listProduct = res.data;
      }
    )
  }

  getProductColor = () => {
    this.productService.getColor().subscribe(
      (res) => {
        this.listColor = res.data;
      }
    )
  };

  getProductDetail = () => {
    this.productService.getDetail().subscribe(
      (res) => {
        this.listDetail = res.data;
      }
    )
  };

  getProductImage = () => {
    this.productService.getImage().subscribe(
      (res) => {
        this.listImage = res.data;
        this.listImageFilter = res.data;
      }
    )
  };

  getListComment = () => {
    this.commentService.getList().subscribe(
      (res) => {
        this.listComment = res.data;
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

  getListSize() {
    this.productService.getListSize().subscribe(
      (res) => {
        this.listSizeFilter = res.data;
      }
    );
  }

  getListCity() {
    this.positionService.getListCity().subscribe(
      (res: any) => {
        this.listCity = res.data;
      }
    );
  }

  getListDistrict(req: any) {
    this.positionService.getListDistrict(req).subscribe(
      (res: any) => {
        this.listDistrict = res.data;
        console.log( res.data)
      }
    );
  }

  getListWard(req: any) {
    this.positionService.getListWard(req).subscribe(
      (res: any) => {
        this.listWard = res.data;
        console.log( res.data)
      }
    );
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

  listAllProduct: any;
  listOfOptionSize: any;
  getListAllProduct = () => {
    this.productService.getListAll().subscribe(
      (res) => {
        this.listAllProduct = res.data;
        this.productService.getListSize().subscribe(
          (resSize) => {
            this.listOfOptionSize = resSize.data.map((x: any) => x.size);
          }
        );
      }
    )
  }
}
