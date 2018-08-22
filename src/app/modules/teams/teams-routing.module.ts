
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TeamsComponent} from './teams.component';
import {TeamSquad} from './components/team-squad/team-squad.component';

export const teamsRoutes: Routes = [
    {
            path: 'teams',
            component: TeamsComponent,
            data: {title: 'Teams'},
            children: []
    },
    {
               path: 'players',
               component: TeamSquad,
               data: {title: 'Players'},
               children: []
       }
];

@NgModule({
    imports: [
        RouterModule.forChild(teamsRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class TeamsRoutingModule {
}

