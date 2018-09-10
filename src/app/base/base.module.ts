import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MomentDateAdapter } from '@angular/material-moment-adapter';
// import { ExpenseComponent } from './expense/expense.component';
// import { AddExpenseCategoryComponent } from './add-expense-category/add-expense-categeory.component';

@NgModule({
    imports: [
        MatToolbarModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatDatepickerModule
    ],
    exports: [
        MatToolbarModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatDatepickerModule
    ],
    declarations: []
})

export class BaseModule { }
