import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
// import { ExpenseComponent } from './expense/expense.component';
// import { AddExpenseCategoryComponent } from './add-expense-category/add-expense-categeory.component';

@NgModule({
    imports: [
        MatToolbarModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatSidenavModule
    ],
    exports: [
        MatToolbarModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatSidenavModule
    ],
    declarations: []
})

export class BaseModule { }
