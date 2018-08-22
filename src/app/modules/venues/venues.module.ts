import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VenuesComponent } from './venues.component';
import {VenuesRoutingModule} from './venues-routing.module';
import {UIComponentModule} from '../../core/ui-components/ui-components.module';
import {FormsModule} from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    VenuesRoutingModule,
    UIComponentModule,
    FormsModule
  ],
  declarations: [
    VenuesComponent
  ]
})
export class VenuesModule {


}
