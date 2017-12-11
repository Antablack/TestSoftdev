import { ModuleWithProviders } from "@angular/cli";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./component/home/home.components";
import { ManagerComponent } from "./component/manager.components";
const appRoutes = [

    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'q/:id',
        component: HomeComponent
    },
    {
        path: 'manager',
        component: ManagerComponent
    }
]


export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);