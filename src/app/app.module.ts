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

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        BaseComponent,
        LoginComponent,
        AddExpenseComponent,
        AlertComponent,
        LoadingComponent,
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
        AddExpenseCategoryModule
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        AlertService,
        ExpenseService,
        ExpenseCategoriesService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
