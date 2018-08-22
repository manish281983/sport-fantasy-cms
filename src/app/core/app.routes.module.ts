
import {NgModule} from '@angular/core';
import {RouterModule, Routes, Router} from '@angular/router';
import {ResolutionSrvc} from './services/resolution.service';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'teams',
        pathMatch: 'full'
    },

];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {enableTracing: false})
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
    MOBILE_WIDTH = 767;
    mobileRoutes: Routes;

    constructor(router: Router, resolutionSrvc: ResolutionSrvc) {
        const desktopRoutes = router.config;
        resolutionSrvc.width.subscribe(width => {
            if (width > this.MOBILE_WIDTH) {
                router.resetConfig(desktopRoutes);
            }
            else {
                if (!this.mobileRoutes) {
                    this.mobileRoutes = this.getRoutes(router.config, '');
                    this.mobileRoutes.filter((obj, pos, arr) => {
                        return arr.map(mapObj => mapObj['path']).indexOf(obj['path']) === pos;
                    });
                }
                router.resetConfig(this.mobileRoutes);
            }
            router.navigateByUrl(router.url);
        });
    }

    getRoutes(routes: Routes, path: string, mobileRoutes: any[] = []) {
        routes.forEach(route => {
            if (route) {
                if (route.redirectTo) {
                    path = route.redirectTo;
                    mobileRoutes.push(route);
                } else {
                    let tempPath = route.children || route.path === path ? route.path : path + '/' + route.path;
                    //TODO: Add logic for loadChildren and other attributes
                    //TODO: Need to check for other configs
                    mobileRoutes.push({
                        path: tempPath,
                        component: route.component,
                        data: route.data || {}
                    });
                }
            }

            if (route.children) {
                path = route.path;
                this.getRoutes(route.children, path, mobileRoutes);
            }
        });

        return mobileRoutes;
    }
}
