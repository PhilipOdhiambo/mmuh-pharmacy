import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BincardPageComponent } from './pages/bincard-page/bincard-page.component';
import { ReceivePageComponent } from './pages/receive-page/receive-page.component';
import { IssuePageComponent } from './pages/issue-page/issue-page.component';

export const routes: Routes = [
    {
        path: '', component: HomePageComponent
    },

    {
        path:'receive', component:ReceivePageComponent
    },
    
    {
        path:'issue', component:IssuePageComponent
    },
    
    {
        path:'issue', component:IssuePageComponent
    },
    {
        path:'bincard', component:BincardPageComponent
    },
    {
        path:'**', component:HomePageComponent
    }
];
