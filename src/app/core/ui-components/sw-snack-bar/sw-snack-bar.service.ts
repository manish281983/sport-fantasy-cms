
import {Injectable, Output, ComponentFactoryResolver, ComponentRef} from "@angular/core";
import {SnackBarComponent} from './sw-snack-bar.component';

@Injectable()

export class SnackBarSrvc {
    cmpRef: ComponentRef<any>;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    //TODO : Customize this component based on future requirement
    //TODO: Queue mechanism
    show(config) {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }

        if (config.containerRef) {
            let factory = this.componentFactoryResolver.resolveComponentFactory(SnackBarComponent);
            this.cmpRef = config.containerRef.createComponent(factory);

            setTimeout(() => {
                this.cmpRef.instance.showSnackBar = true;
                Object.assign(this.cmpRef.instance, config.data || {});
            }, 0);

            setTimeout(() => {
                this.close();
            }, config.data.duration || 3000);

        } else {
            console.log('Error in creating component.Snack bar must have View Container assigned');
        }
    }

    close() {
        this.cmpRef.instance.showSnackBar = false;
    }

    showSnackbar(msg, configView, messageType, subText?, enableFlag?) {
        this.show({
            containerRef: configView,
            data: {
                message: msg,
                highlightText: subText,
                type: messageType,
                enabled: enableFlag
            }
        });
    }

}
