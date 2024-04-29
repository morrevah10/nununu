import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './root/app.component';
import { LoginComponent } from './cmps/login/login.component';
import { OrdersComponent } from './cmps/orders/orders.component';
import { StockComponent } from './cmps/stock/stock.component';


@NgModule({
  declarations: [
    
    AppComponent,
    LoginComponent,
    OrdersComponent,
    StockComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
