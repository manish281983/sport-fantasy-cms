import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsComponent } from './teams.component';
import {TeamsRoutingModule} from './teams-routing.module';
import {MatTabsModule, MatListModule} from '@angular/material';
import {UIComponentModule} from '../../core/ui-components/ui-components.module';
import {FormsModule} from '@angular/forms';
import {TeamSquad} from './components/team-squad/team-squad.component';

@NgModule({
  imports: [
    CommonModule,
    TeamsRoutingModule,
    MatTabsModule,
    MatListModule,
    UIComponentModule,
    FormsModule
  ],
  declarations: [
    TeamsComponent,
    TeamSquad
  ]
})
export class TeamsModule {


}
