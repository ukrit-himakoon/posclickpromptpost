import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Config } from '../config.const';

@Injectable()
export class DetailproductService {
    constructor(private http: Http) { }

    list(id: any): any {
        let body = {
       "data": {
        "id": id
        }

        };
        return this.http.post(Config.ServiceUrl + '/api/product/getProductDetail ', body)
            .toPromise()
            .then(res => {
                return res.json();
            });
    }
}