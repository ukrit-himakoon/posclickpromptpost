import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Config } from '../config.const';

@Injectable()
export class ProductService {
    constructor(private http: Http) { }

    list(id: any, size: any): any {
        let body = {
        "criteria": {
        "status": "ACTIVE",
        "language":"th"
        },
        "page": id,
        "size": size,
        "orders": [
        "createdDateTime"
        ],
        "directions": [
        "DESC"
        ],
        "locale":"en"
        };
        return this.http.post(Config.ServiceUrl + '/api/product/searchAllProduct ', body)
            .toPromise()
            .then(res => {
                return res.json();
            });
    }
}
