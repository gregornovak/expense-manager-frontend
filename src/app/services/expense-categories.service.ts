import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../api-url';
import { ExpenseCategories } from '../models/expense-categories.model';
import { Observable } from 'rxjs';

@Injectable()
export class ExpenseCategoriesService {

    constructor(private http: HttpClient) {}

    getAll(): Observable<Array<ExpenseCategories>> {
        return this.http.get<Array<ExpenseCategories>>(`${apiUrl}expense-categories`);
    }

    // getOne() {

    // }

    create(expense: ExpenseCategories): Observable<any> {
        return this.http.post(`${apiUrl}expense-categories`, expense);
    }

    // update() {

    // }

    // delete() {

    // }
}
