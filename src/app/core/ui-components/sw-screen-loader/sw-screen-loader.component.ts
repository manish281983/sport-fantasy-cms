/*
 * PARAMETERS
 *   show: boolean
 *   message: string
 * */
import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'screen-loader',
    templateUrl: './sw-screen-loader.template.html',
    styleUrls: ['./sw-screen-loader.scss']
})

export class ScreenLoaderComponent {
    @Input() loaderObj: object;
}
