import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { BaseComponent } from './base/base.component';
import { HomeComponent } from './base/home/home.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { BaseModule } from './base/base.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { AlertService } from './services/alert.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpenseService } from './services/expense.service';
import { HomeModule } from './base/home/home.module';
import { MatSidenavModule } from '@angular/material';
import { LoginModule } from './login/login.module';
import { AddExpenseModule } from './base/add-expense/add-expense.module';
import { AddExpenseComponent } from './base/add-expense/add-expense.component';
import { ExpenseCategoriesService } from './services/expense-categories.service';
import { AlertComponent } from './directives/alert/alert.component';
import { AlertModule } from './directives/alert/alert.module';
import { AddExpenseCategoryModule } from './base/add-expense-category/add-expense-category.module';
import { AddExpenseCategoryComponent } from './base/add-expense-category/add-expense-categeory.component';
import { ExpenseModule } from './base/expense/expense.module';
import { ExpenseComponent } from './base/expense/expense.component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';

export function highchartsModules(): Array<any> {
    // apply Highcharts Modules to this array
    return [stock, more];
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        BaseComponent,
        LoginComponent,
        AddExpenseComponent,
        AlertComponent,
        LoadingComponent,
        ExpenseComponent,
        AddExpenseCategoryComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BaseModule,
        HomeModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatSidenavModule,
        LoginModule,
        AddExpenseModule,
        AlertModule,
        AddExpenseCategoryModule,
        ExpenseModule,
        ChartModule
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        AlertService,
        ExpenseService,
        ExpenseCategoriesService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
