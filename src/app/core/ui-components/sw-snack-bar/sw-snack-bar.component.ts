
import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'snack-bar',
    templateUrl: './sw-snack-bar.template.html',
    styleUrls: ['sw-snack-bar.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SnackBarComponent {
    showSnackBar: boolean;

    close() {
        this.showSnackBar = false;
    }
}
