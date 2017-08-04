import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Config } from '../config.const';

@Injectable()
export class OrderdetailService {
    constructor(private http: Http) { }

    list(list:any): any {
        let body = list;
        /*let body = { 
            "data": { 
                "masterOrderId": "75"
            }
        }, 
            "locale": "th" 
        } ;*/
        return this.http.post(Config.ServiceUrl + '/api/proxy/getOrderDetail ', body)
            .toPromise()
            .then(res => {
                return res.json();
            });
    }
}