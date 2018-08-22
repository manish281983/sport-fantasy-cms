import {Injectable} from '@angular/core';

@Injectable()

export class StorageSrvc {
    setData(key, data) {
        if (key && data) {
            sessionStorage.setItem(key, JSON.stringify(data));
        }
    }

    getData(key) {
        if (key) {
            return JSON.parse(sessionStorage.getItem(key));
        }
        return null;
    }
}
