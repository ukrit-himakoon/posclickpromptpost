import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from '../../app.component';

@Component({
    selector: 'media-component',
    templateUrl: 'media.component.html'
})
export class MediaComponent implements OnInit {

    products: any[];
    orderproducts: any[];
    priceorder: any = {};
    numproduct= 0;

    //constructor(private router: Router) { }

    constructor(private router: Router,private app:AppComponent) {}

    ngOnInit() {

        
        
    } 
}
