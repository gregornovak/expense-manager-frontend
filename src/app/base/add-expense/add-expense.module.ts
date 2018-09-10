import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';
import { CurrencyPipe } from '@angular/common';

@NgModule({
    imports: [
        MatInputModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatSelectModule
    ],
    exports: [
        MatInputModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatSelectModule
    ],
    providers: [
        CurrencyPipe
    ]
})

export class AddExpenseModule { }
