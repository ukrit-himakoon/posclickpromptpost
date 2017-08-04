import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'searchorderdetailmerchant-component',
    templateUrl: 'searchorderdetailmerchant.component.html'
})
export class SearchorderdetailmerchantComponent implements OnInit {

    merchantdata : any = {};
    merchantid:string;

    constructor(private router: Router) {}

    ngOnInit() {
        this.merchantdata = JSON.parse(sessionStorage.getItem('selectedordermerchant'));
    }
}