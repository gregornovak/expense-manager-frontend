import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { ExpenseCategoriesService } from '../../services/expense-categories.service';
import { Router } from '@angular/router';
import { ExpenseCategories } from '../../models/expense-categories.model';
import { Currency } from '../../models/currency.model';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { AlertService } from '../../services/alert.service';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'add-expense',
    templateUrl: './add-expense.component.html',
    styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
    private form: FormGroup;
    private loading = false;
    private submitted = false;
    private expenseCategories: Array<ExpenseCategories>;
    private currencies: Array<Currency> = [
        { value: 'EUR', viewValue: 'Euro - €' },
        { value: 'USD', viewValue: 'United States dollar - $' },
        { value: 'CHF', viewValue: 'Swiss franc - CHF' },
        { value: 'SEK', viewValue: 'Swedish krona - kr' }
    ];

    constructor(
        private formBuilder: FormBuilder,
        private expenseService: ExpenseService,
        private expenseCategoriesService: ExpenseCategoriesService,
        private router: Router,
        private alertService: AlertService,
        private currencyPipe: CurrencyPipe
    ) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: [undefined, Validators.required],
            amount: [0.0, Validators.required],
            currency: [undefined, Validators.required],
            cash: [false],
            payee: [''],
            status: [false],
            description: [''],
            expenses_category: ['', Validators.required]
        });

        this.expenseCategoriesService.getAll()
            .subscribe(data => {
                this.expenseCategories = data;
            },
            error => {
                this.alertService.error('There was an error, try again later.');
            });
    }

    get f(): {[key: string]: AbstractControl } { return this.form.controls; }

    onSubmit(): void {
        this.submitted = true;

        if (this.form.invalid)
            return;

        this.form.value.amount = this.form.value.amount * 100;
        this.loading = true;
        this.expenseService.create(this.form.value)
            .subscribe(data => {
                this.alertService.success('Expense has been added successfully.');
                setTimeout(() => {
                    this.router.navigate(['home']);
                }, 500);
            },
            error => {
                this.loading = false;
                this.alertService.error('There was an error adding the expense.');
            }
        );
    }
}
