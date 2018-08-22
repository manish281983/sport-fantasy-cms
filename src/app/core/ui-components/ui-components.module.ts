

import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    MatMenuModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule,
    MatTabsModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipeModule } from  '../pipe/pipe.module';

import {AppHeaderComponent}  from './app-header/app-header.component';
import {AppSubHeaderComponent}  from './app-sub-header/app-sub-header.component';
import {AppFooterComponent}  from './app-footer/app-footer.component';
import {AppModalComponent}  from './app-modal/app-modal.component';
import {ScreenLoaderComponent}  from './sw-screen-loader/sw-screen-loader.component';
import {PaginationComponent}  from './sw-pagination/sw-pagination.component';
import {SnackBarComponent}  from './sw-snack-bar/sw-snack-bar.component';
import {MessageDisplayComponent}  from './sw-message-display/sw-message-display.component';
import {ServiceHandlingComponent}  from './sw-service-handling/sw-service-handling.component';
import {ModalSrvc} from './app-modal/app-modal.service';
import {SnackBarSrvc} from './sw-snack-bar/sw-snack-bar.service';
import {ServiceHandlingSrvc} from './sw-service-handling/sw-service-handling.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatMenuModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        PipeModule,
        MatTabsModule
    ],
    exports: [
        AppHeaderComponent,
        AppSubHeaderComponent,
        AppFooterComponent,
        AppModalComponent,
        ScreenLoaderComponent,
        MessageDisplayComponent,
        PaginationComponent,
        SnackBarComponent,
        ServiceHandlingComponent
    ],
    declarations: [
        AppHeaderComponent,
        AppSubHeaderComponent,
        AppFooterComponent,
        AppModalComponent,
        ScreenLoaderComponent,
        MessageDisplayComponent,
        PaginationComponent,
        SnackBarComponent,
        ServiceHandlingComponent
    ],
    entryComponents: [
        SnackBarComponent
    ],
    providers: [
        ModalSrvc,
        SnackBarSrvc,
        ServiceHandlingSrvc
    ]
})

export class UIComponentModule {
}
