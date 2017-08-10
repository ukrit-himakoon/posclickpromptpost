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
    numproduct = 0;

    //constructor(private router: Router) { }

    constructor(private router: Router, private app: AppComponent) { }

    textresult = 'gg';
    ngOnInit() {



    }
    generateText(f: string, l: string, ad: string, ar: string, ci: string, st: string, co: string, zi: string, tel: string, fa: string, e:string) {
        if (f && l && ad && ar && ci && st && co && zi && tel && fa && e) {
            var Addressd = f + " " + l + " " + ad + " " + ar + " " + ci + " " + st + " " + co + " " + zi + " " + tel + " " + fa + " " + e;
            console.log(Addressd);
            this.textresult = Addressd;
            var addressformat = {
                "firstName": f,
                "lastName": l,
                "addressDetail1": ad,
                "addressDetail2": ar,
                "city": ci,
                "state": st,
                "country": co,
                "postCode": zi,
                "fax": fa,
                "telephone": tel,
                "email": e,
            }
            sessionStorage.setItem('addressdata', JSON.stringify(addressformat));
           // this.router.navigate(['/createpayment']);
        }
    }
}
