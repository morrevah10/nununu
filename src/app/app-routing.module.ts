import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './root/app.component';
import { OrdersComponent } from './cmps/orders/orders.component';
import { LoginComponent } from './cmps/login/login.component';

const routes: Routes = [
  { path: '', component:LoginComponent },
  {path:'orders', component:OrdersComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
