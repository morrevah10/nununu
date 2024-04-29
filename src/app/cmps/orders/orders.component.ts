import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NunuService } from '../../services/nunu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  ordersForm!: FormGroup;
  errorMessage: string = '';
  orders: any[] = []; 

  constructor(
    private formBuilder: FormBuilder,
    private nunuService: NunuService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.ordersForm = this.formBuilder.group({
      orderNumber: ['', [Validators.required]],
      customerName:['',[Validators.required]],
      customerFile:['',[Validators.required]],
    });
    this.getOrders();
  }

  getOrders() {
    this.nunuService.getOrders().subscribe(
      (orders) => {
        this.orders = orders;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  get formControls() {
    return this.ordersForm.controls;
  }

  onFormSubmit() {
    if (this.ordersForm.valid) {
      const formData = new FormData();
      formData.append('orderNumber', this.ordersForm.value.orderNumber);
      formData.append('customerName', this.ordersForm.value.customerName);
      formData.append('customerFile', this.ordersForm.value.customerFile);

      this.nunuService.submitOrder(formData).subscribe(
        (response) => {
          console.log('Order submitted successfully');
        },
        (error) => {
          console.error('Error submitting order:', error);
        }
      );
    }
  }
}
