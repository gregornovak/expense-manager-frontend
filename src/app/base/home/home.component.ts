import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { ExpenseService } from '../../services/expense.service';
import { Expenses } from '../../models/expenses.model';
import { AlertService } from '../../services/alert.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { Chart, StockChart } from 'angular-highcharts';
import { Expense } from '../../models/expense.model';
import { ValueTransformer } from '@angular/compiler/src/util';

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
    month: number = new Date().getMonth() + 1; // months start at 0
    year: number = new Date().getFullYear();

    constructor(private expenseService: ExpenseService, private alertService: AlertService) {}

    ngOnInit(): void {
        this.getExpenses(this.page, this.pageSize);
    }

    private getExpenses(page: number, pageSize: number): void {
        this.loading = true;
        this.expenseService.getByMonth(String(this.month), String(this.year))
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
        const arr: Array<any> = [];
        Object.keys(this.expenses.data)
        .forEach(value => {
            const timestamp = + new Date(this.expenses.data[value].added);

            arr.push([timestamp, this.expenses.data[value].amount / 100]);
        });

        return arr;
    }
}
