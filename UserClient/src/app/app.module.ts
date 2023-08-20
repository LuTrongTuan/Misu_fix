import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProductsingleComponent } from './productsingle/productsingle.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopComponent } from './shop/shop.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { AddressComponent } from './address/address.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BaseComponent } from './components/base/base.component';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllProductComponent } from './shop/all-product/all-product.component';
import { FindByImageComponent } from './components/find-by-image/find-by-image.component';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentComponent } from './comment/comment.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgOption, NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductsingleComponent,
    CartComponent,
    CheckoutComponent,
    ShopComponent,
    DashboardComponent,
    OrdersComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ProfileDetailsComponent,
    AddressComponent,
    EditAddressComponent,
    BaseComponent,
    AllProductComponent,
    FindByImageComponent,
    CommentComponent,
    BlogComponent,
    BlogDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    NgbModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    NgSelectModule,
  ],
  providers: [
    CookieService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
