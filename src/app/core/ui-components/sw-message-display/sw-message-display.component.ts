/*
 * PARAMETERS
 *   hidden: boolean
 *   title: string
 *   linkLbl: string
 *   logo:string
 *   hideLink: boolean
 *   hideLogo: boolean
 * */

import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'message-display',
    templateUrl: './sw-message-display.template.html',
    styleUrls: ['./sw-message-display.scss']
})

export class MessageDisplayComponent {
    @Input() messageObj: object;
    @Output() refreshCall: EventEmitter<any> = new EventEmitter();

    messageLinkAction() {
        this.refreshCall.emit();
    }
}
