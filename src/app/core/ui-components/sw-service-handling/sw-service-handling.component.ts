import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'service-handling',
    templateUrl: './sw-service-handling.template.html',
    styleUrls: ['./sw-service-handling.scss']
})

export class ServiceHandlingComponent {
    @Input() serviceObj: object;
    @Output() refreshCall: EventEmitter<any> = new EventEmitter();

    messageRefreshCall() {
        this.refreshCall.emit();
    }
}
