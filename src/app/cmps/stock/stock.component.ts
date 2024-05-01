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
      name: ['', [Validators.required]],
      file: [null, [Validators.required]],  // Expect a File object here
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
      formData.append('stock_name', this.stocksForm.value.name);
      formData.append('stock_file', this.stocksForm.value.file);  // Ensure the correct form data keys

      this.nunuService.submitStock(formData).subscribe(
        (response: any) => {
          console.log('Stock submitted successfully');
          this.getStocks();  // Refresh the stocks list
        },
        (error: HttpErrorResponse) => {  // Explicitly type the error parameter
          console.error('Error submitting stock:', error.message);
        }
      );
    }
  }

  navigateToOrdersPage() {
    this.router.navigate(['/orders']);
  }
}
