import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
    imports: [
        MatInputModule,
        MatFormFieldModule
    ],
    exports: [
        MatInputModule,
        MatFormFieldModule
    ]
})

export class AddExpenseCategoryModule { }
