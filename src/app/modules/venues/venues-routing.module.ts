
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VenuesComponent} from './venues.component';

export const venuesRoutes: Routes = [
    {
            path: 'venues',
            component: VenuesComponent,
            data: {title: 'Venues'}
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(venuesRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class VenuesRoutingModule {
}

