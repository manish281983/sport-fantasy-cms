
import {Injectable} from "@angular/core";
import {Subject} from 'rxjs/Subject';

@Injectable()

export class ModalSrvc {
    showModal: Subject<any> = new Subject();
    closeModal: Subject<any> = new Subject();
}
