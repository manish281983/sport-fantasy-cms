import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()

export class ResolutionSrvc {
    constructor(ngZone: NgZone) {
        window.onresize = (e) => {
            ngZone.run(() => {
                this.width.next(window.innerWidth);
            });
        };
    }

    width: BehaviorSubject<number> = new BehaviorSubject<number>(window.innerWidth);
}
