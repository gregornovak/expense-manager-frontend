import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrl } from '../api-url';
import { Expenses } from '../models/expenses.model';
import { Expense } from '../models/expense.model';
import { Observable } from 'rxjs';

@Injectable()
export class ExpenseService {

    constructor(private http: HttpClient) { }

    getAll(page?: number, limit?: number): Observable<Expenses> {
        const uri = page && limit ? `expenses?page=${page}&limit=${limit}` : 'expenses';

        return this.http.get<Expenses>(apiUrl + uri);
    }

    getByMonth(month: string, year?: string, page?: number, limit?: number): Observable<Expenses> {
        // const uri = page && limit ? `expenses?page=${page}&limit=${limit}` : 'expenses';

        return this.http.get<Expenses>(`${apiUrl}monthly-expenses/${month}/${year}`);
    }

    // getOne() {

    // }

    create(expense: Expense): any {
        return this.http.post(`${apiUrl}expenses`, expense);
    }

    // update() {

    // }

    // delete() {

    // }

}
