import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ClientsComponent } from './clients/clients.component';
import { CompanyComponent } from './company/company.component';
import { CreateBillComponent } from './create-bill/create-bill.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddBillComponent } from './files/add-bill/add-bill.component';
import { BillsComponent } from './files/bills/bills.component';
import { ContractsComponent } from './files/contracts/contracts.component';
import { OthersComponent } from './files/others/others.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { PaperManagerComponent } from './paper-manager/paper-manager.component';
import { ProjectsComponent } from './projects/projects.component';
import { RolesComponent } from './roles/roles.component';
import { SpaceGuard } from './space.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'dashboard',
        component:DashboardComponent,
        canActivate:[SpaceGuard]
      },

      {
        path:'',
        redirectTo:'/dashboard',
        pathMatch:'full'
      },
      {
        path:'profile',
        component:CompanyComponent,
        canActivate:[SpaceGuard]
      },
       {
        path:'users',
        component:UsersComponent,
        canActivate:[SpaceGuard]
       },

      {
        path:'clients',
        component:ClientsComponent,
        canActivate:[SpaceGuard]


      },
      {
        path:'roles',
        component:RolesComponent,
        canActivate:[SpaceGuard]


      },
      {
        path:'projects',
        component:ProjectsComponent,
        canActivate:[SpaceGuard]


      },
      {
        path:'bills',
        component:BillsComponent,
        canActivate:[SpaceGuard]
      },
      {
        path:'contracts',
        component:ContractsComponent,
        canActivate:[SpaceGuard]
      },
      {
        path:'others',
        component:OthersComponent,
        canActivate:[SpaceGuard]
      },
      {
        path:'addBill/:numBill',
        component:CreateBillComponent,
        canActivate:[SpaceGuard]
      },
      {
        path:'paperManager',
        component:PaperManagerComponent,
        canActivate:[SpaceGuard]
      },
      {
        path:'userProfile',
        component:UserProfileComponent,
        canActivate:[SpaceGuard]
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
