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
       customerName: ['', [Validators.required]],
       customerFile: [null, [Validators.required]],  // Ensure the form control is expecting a File object
     });
     this.getOrders();
   }

   getOrders() {
     this.nunuService.getOrders().subscribe(
       (response: any) => {
         this.orders = response.data;
         console.log(this.orders)
       },
       (error) => {
         console.error('Error fetching orders:', error);
       }
     );
   }

   get formControls() {
     return this.ordersForm.controls;
   }

   onFileSelect(event: Event) {
     const element = event.currentTarget as HTMLInputElement;
     let file: File | null = element.files ? element.files[0] : null;
     if (file) {
       this.ordersForm.patchValue({ customerFile: file });
     }
   }

   onFormSubmit() {
     if (this.ordersForm.valid) {
       const formData = new FormData();
       formData.append('order_name', this.ordersForm.value.orderNumber);
       formData.append('customer_name', this.ordersForm.value.customerName);
       formData.append('order_file', this.ordersForm.value.customerFile);

       this.nunuService.submitOrder(formData).subscribe(
         (response) => {
           console.log('Order submitted successfully');
           this.getOrders();
         },
         (error) => {
           console.error('Error submitting order:', error);
         }
       );
     }
   }

   deleteOrder(order: any) {
     console.log(order)
   }

   downloadOrder(order: any) {
    console.log(order)
  }

   navigateToStockPage() {
     this.router.navigate(['/stocks']);
   }


}
