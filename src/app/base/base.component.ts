import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
    title = 'base';

    private firstname: string;
    private lastname: string;

    ngOnInit(): void {
        this.firstname = JSON.parse(localStorage.getItem('firstname'));
        this.lastname = JSON.parse(localStorage.getItem('lastname'));
    }
}
