import {Injectable} from '@angular/core';

@Injectable()

export class ServiceHandlingSrvc {

    showHideLoader(data, val) {
        data.loading.show = val;
        data.message.show = !val;
    }
}
