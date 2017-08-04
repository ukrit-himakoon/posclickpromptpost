import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Config } from '../config.const';

@Injectable()
export class SearchordermerchantService {
    constructor(private http: Http) { }

    list(list:any): any {
        let body = list;
        /*let body = { 
                        "data": { 
                        "customerId": "U00000008" 
                    }, 
                    "page": "1", 
                    "size": "10" 
        }  ;*/
        return this.http.post(Config.ServiceUrl + '/api/merchantorder/searchOrder', body)
            .toPromise()
            .then(res => {
                //console.log(res.json());
                return res.json();
            });
    }
}