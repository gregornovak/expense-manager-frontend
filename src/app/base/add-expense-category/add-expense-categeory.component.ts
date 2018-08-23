import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseCategoriesService } from '../../services/expense-categories.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-add-expense-category',
    templateUrl: './add-expense-category.component.html',
    styleUrls: ['./add-expense-category.component.css']
})
export class AddExpenseCategoryComponent implements OnInit {
    private form: FormGroup;
    private loading = false;
    private submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private expenseCategoriesService: ExpenseCategoriesService,
        private router: Router,
        private alertService: AlertService
    ) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            category: [undefined, [Validators.required, Validators.minLength(2)]]
        });
    }

    get f(): {[key: string]: AbstractControl } { return this.form.controls; }

    onSubmit(): void {
        this.submitted = true;

        if (this.form.invalid)
            return;

        this.loading = true;
        this.expenseCategoriesService.create(this.form.value)
            .subscribe(data => {
                this.alertService.success('Expense category has been added successfully.');
                setTimeout(() => {
                    this.router.navigate(['home']);
                }, 500);
            },
            error => {
                this.loading = false;
                this.alertService.error('There was an error adding the expense category.');
            }
        );
    }
}
