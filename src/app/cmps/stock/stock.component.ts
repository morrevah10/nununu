import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NunuService } from '../../services/nunu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  stocksForm!: FormGroup;
  errorMessage: string = '';
  stocks: any[] = []; 


  constructor(
    private formBuilder: FormBuilder,
    private nunuService: NunuService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.stocksForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      file:['',[Validators.required]],
    });
    this.getStocks();
  }

  getStocks() {
    this.nunuService.getStocks().subscribe(
      (stocks) => {
        this.stocks = stocks;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  get formControls() {
    return this.stocksForm.controls;
  }

  onFormSubmit() {
    if (this.stocksForm.valid) {
      const formData = new FormData();
      formData.append('orderNumber', this.stocksForm.value.orderNumber);
      formData.append('customerName', this.stocksForm.value.customerName);
     

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
