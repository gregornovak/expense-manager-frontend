import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { ExpenseService } from '../../services/expense.service';
import { Expenses } from '../../models/expenses.model';
import { AlertService } from '../../services/alert.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { Chart, StockChart } from 'angular-highcharts';
import { Expense } from '../../models/expense.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    expenses: Expenses;
    resultsLength = 5;
    loading = false;
    chartData: Array<Object>;
    chart: Chart;
    stockChart: StockChart;
    page = 1;
    pageSize = 5;

    constructor(private expenseService: ExpenseService, private alertService: AlertService) {}

    ngOnInit(): void {
        this.getExpenses(this.page, this.pageSize);
    }

    private getExpenses(page: number, pageSize: number): void {
        this.loading = true;
        this.expenseService.getAll(page, pageSize)
        .subscribe(
        result => {
            this.expenses = result;
            this.chartData = this.mapToGraphData();

            this.stockChart = new StockChart({
                rangeSelector: {
                    selected: 1
                },
                title: {
                    text: 'Monthly expense view'
                },
                series: [{
                    name: 'August',
                    data: this.chartData
                }]
            });

            this.resultsLength = result.count;
            this.loading = false;
        },
        error => {
            this.alertService.error('There was an error with fetching expenses.');
            this.loading = false;
        });
    }

    private mapToGraphData(): Array<any> {
        return this.expenses.data.map((value: Expense, index: number) => {
            const timestamp = + new Date(value.added);

            return [timestamp, value.amount / 100];
        });
        // return this.expenses.data.map((value: Expense, index: number) => {
        //     const day = new Date(value.added).getDay();
        //     console.log(day);
        //     return {x: day, y: value.amount / 100, name: value.name };
        // });
    }
}
