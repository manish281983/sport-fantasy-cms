
import {Component, ViewEncapsulation, Input} from '@angular/core';

@Component({
    selector: 'app-sub-header',
    templateUrl: './app-sub-header.template.html',
    styleUrls: ['./app-sub-header.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AppSubHeaderComponent {
    @Input() title: string;
    constructor() {
    }



}
