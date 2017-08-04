import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'searchorderdetail-component',
    templateUrl: 'searchorderdetail.component.html'
})
export class SearchorderdetailComponent implements OnInit {

    customerdata : any = {};
    merchantid:string;

    constructor(private router: Router) {}

    ngOnInit() {
        this.customerdata = JSON.parse(sessionStorage.getItem('selectedordercustomer'));
    }
}