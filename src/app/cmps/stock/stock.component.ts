import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NunuService } from '../../services/nunu.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse for error typing

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  stocksForm!: FormGroup;
  errorMessage: string = '';
  total: any;
  stocks: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private nunuService: NunuService,
    private router: Router
  ) {}

  ngOnInit() {
    this.stocksForm = this.formBuilder.group({
      drop_name: ['', [Validators.required]],
      file: [null, [Validators.required]],  
    });
    this.getStocks();
  }

  getStocks() {
    this.nunuService.getStocks().subscribe(
      (response: any) => {
        console.log(response);
        this.total = response.total_qty;
        this.stocks = response.data;
      },
      (error: HttpErrorResponse) => {  // Explicitly type the error parameter
        console.error('Error fetching stocks:', error.message);
      }
    );
  }

  get formControls() {
    return this.stocksForm.controls;
  }

  onFileSelect(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let file: File | null = element.files ? element.files[0] : null;
    if (file) {
      this.stocksForm.patchValue({ file: file });
    }
  }

  onFormSubmit() {
    if (this.stocksForm.valid) {
      const formData = new FormData();
      console.log('stock_name', this.stocksForm.value.drop_name);
      console.log('stock_file', this.stocksForm.value.file)
      formData.append('drop_name', this.stocksForm.value.drop_name);
      formData.append('file', this.stocksForm.value.file);  

      this.nunuService.submitStock(formData).subscribe(
        (response: any) => {
          console.log(response)
          console.log('Stock submitted successfully');
          this.getStocks();  
        },
        (error: HttpErrorResponse) => {  
          console.error('Error submitting stock:', error.message);
        }
      );
    }
  }

  deleteOrder(stock: any) {
    console.log(stock)
  }

  downloadOrder(stock: any) {
   console.log(stock)
 }

  navigateToOrdersPage() {
    this.router.navigate(['/orders']);
  }
}
