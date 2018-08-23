import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { ExpenseService } from '../../services/expense.service';
import { Expenses } from '../../models/expenses.model';
import { AlertService } from '../../services/alert.service';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    title = 'home';
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns: Array<string> = ['name', 'amount', 'payee', 'added'];
    expenses: Expenses;
    resultsLength = 5;
    pageSizeOptions: Array<number> = [5, 10];
    loading = false;
    private page = 1;
    private pageSize = 5;

    constructor(private expenseService: ExpenseService, private alertService: AlertService) {}

    ngOnInit(): void {
        this.getExpenses(this.page, this.pageSize);
    }

    private onPageChange(event: PageEvent): void {
        this.getExpenses(event.pageIndex + 1, event.pageSize);
    }

    private getExpenses(page: number, pageSize: number): void {
        this.loading = true;
        this.expenseService.getAll(page, pageSize)
        .subscribe(
        result => {
            this.expenses = result;
            this.resultsLength = result.count;
            this.loading = false;
        },
        error => {
            this.alertService.error('There was an error with fetching expenses.');
            this.loading = false;
        });
    }
}
