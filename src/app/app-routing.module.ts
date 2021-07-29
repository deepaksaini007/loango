import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsersComponent } from './core/components/admin-users/admin-users.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { FeedbacklistComponent } from './core/components/feedbacklist/feedbacklist.component';
import { ItemlistComponent } from './core/components/itemlist/itemlist.component';
import { ItemtypelistComponent } from './core/components/itemtypelist/itemtypelist.component';
import { MasteradminComponent } from './core/components/masteradmin/masteradmin.component';

import { AdminGuard } from './core/guards/admin/admin.guard';
import { AuthenticationGuard } from './core/guards/Authentication/authentication.guard';
import { SyncHelperGuard } from './core/guards/SyncGuard/sync-helper.guard';

import { LoginComponent } from './shared/login/login.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[AuthenticationGuard]
  },
  {
    path:'item',
    component:ItemlistComponent,
    canActivate:[AuthenticationGuard]
  },
  {
    path:'category',
    component:ItemtypelistComponent,
    canActivate:[AuthenticationGuard]
  },
  {
    path:'app-details',
    component:MasteradminComponent,
   canActivate:[AuthenticationGuard]
  } ,
  {
    path:'feedback',
    component:FeedbacklistComponent,
   canActivate:[AuthenticationGuard]
  },
  {
    path: 'manageUsers',
    component: AdminUsersComponent,
    canActivate: [SyncHelperGuard],
    data:{
      syncGuards:[AuthenticationGuard,AdminGuard]
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
