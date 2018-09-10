import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { ExpenseService } from '../../services/expense.service';
import { Expenses } from '../../models';
import { AlertService } from '../../services/alert.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { Chart, StockChart } from 'angular-highcharts';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Months } from '../../models/month';

// import { MomentDateAdapter } from '@angular/material-moment-adapter';
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// import { MatDatepicker } from '@angular/material/datepicker';
// import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// import { default as _rollupMoment, Moment } from 'moment';

// const moment = _rollupMoment || _moment;
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    expenses: Expenses;
    resultsLength = 0;
    loading = false;
    chartData: Array<Object>;
    chart: Chart;
    stockChart: StockChart;
    page = 1;
    pageSize = 5;
    selectedMonth: number = new Date().getMonth() + 1; // months start at 0
    selectedYear: number = new Date().getFullYear();
    form: FormGroup;
    months: Months = new Months();

    constructor(
        private expenseService: ExpenseService,
        private alertService: AlertService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.createForm();
        this.getExpenses(this.page, this.pageSize);
    }

    updateMonth(event: MatSelectChange): void {
        this.selectedMonth = event.value;
        this.getExpenses(this.page, this.pageSize);
    }

    updateYear(event: MatSelectChange): void {
        this.selectedYear = event.value;
        this.getExpenses(this.page, this.pageSize);
    }

    private createForm(): void {
        this.form = this.formBuilder.group({
            month: this.formBuilder.control(this.selectedMonth),
            year: this.formBuilder.control(this.selectedYear)
        });
    }

    private getExpenses(page: number, pageSize: number): void {
        this.loading = true;
        this.expenseService.getByMonth(String(this.selectedMonth), String(this.selectedYear))
        .subscribe(
            (result: Expenses) => {
            this.expenses = result;
            this.resultsLength = result.count;

            if (this.resultsLength > 0) {
                this.chartData = this.mapToGraphData();

                this.stockChart = new StockChart({
                    // rangeSelector: {
                    //     selected: 1
                    // },
                    title: {
                        text: 'Monthly expense view'
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'August',
                        data: this.chartData
                    }]
                });
            }

            this.loading = false;
        },
        (error: Error) => {
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
