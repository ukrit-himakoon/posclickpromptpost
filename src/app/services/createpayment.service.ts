import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Config } from '../config.const';

@Injectable()
export class CreateproductService {
    constructor(private http: Http) { }


    list(list:any): any {
        let body = list;

        return this.http.post('https://demo2.2c2p.com/2C2PFrontEnd/RedirectV3/payment', body)
            .toPromise()
            .then(res => {
                return res.json();
            });
    }
}    