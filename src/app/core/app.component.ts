
import {Component, HostListener} from '@angular/core';

@Component({
    selector: 'app-container',
    templateUrl: './app.template.html'
})
export class AppComponent {

    topPosition= true;
    ngOnInit() {
        window.addEventListener('scroll', this.scroll, true); //third parameter
    }

    ngOnDestroy() {
        window.removeEventListener('scroll', this.scroll, true);
    }

    scroll = (event): void => {
            if(event.srcElement.scrollTop===0){
                this.topPosition= true;
            } else {
                this.topPosition= false;

            }

    };

}
