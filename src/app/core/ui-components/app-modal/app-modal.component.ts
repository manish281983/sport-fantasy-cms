
import {Component, ComponentRef, Input, ViewContainerRef, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {ModalSrvc} from './app-modal.service';

@Component({
    selector: 'app-modal',
    templateUrl: './app-modal.template.html',
    styleUrls: ['./app-modal.scss']
})
export class AppModalComponent {
    @ViewChild('modalBody', {read: ViewContainerRef}) modalBody;
    cmpRef: ComponentRef<any>;
    isModalOpen: boolean;

    constructor(modalSrvc: ModalSrvc,
                private componentFactoryResolver: ComponentFactoryResolver) {
        modalSrvc.showModal.subscribe(modal => {
            if (this.cmpRef) {
                this.cmpRef.destroy();
            }
            if (modal.component) {
                let factory = this.componentFactoryResolver.resolveComponentFactory(modal.component);
                this.cmpRef = this.modalBody.createComponent(factory);
                Object.assign(this.cmpRef.instance, modal.data || {});
                this.isModalOpen = true;
            } else {
                console.log('Error in creating component.Modal must have component assigned');
            }
        });

        modalSrvc.closeModal.subscribe(type => {
            this.close();
        });
    }

    close() {
        if (this.cmpRef) {
            this.cmpRef.destroy();
            this.cmpRef = null;
        }
        this.isModalOpen = false;
    }
}
