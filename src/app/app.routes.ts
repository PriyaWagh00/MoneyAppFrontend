import { Routes } from '@angular/router';
// import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { TransferComponent } from './transfer/transfer.component';
import { PaymentComponent } from './payment/payment.component';
import { AuthGuard } from './auth.guard';
import { CategoriesComponent } from './categories/categories.component';
import { BalanceComponent } from './balance/balance.component';
import { HistoryComponent } from './history/history.component';
import { MobileComponent } from './mobile/mobile.component';
import { IdComponent } from './id/id.component';
import { ForgetComponent } from './forget/forget.component';
import { ResetComponent } from './reset/reset.component';
import { RechargeComponent } from './recharge/recharge.component';
import { FailedComponent } from './failed/failed.component';
import { NotificationComponent } from './notification/notification.component';
import { AdminComponent } from './admin/admin.component';
// import { SignupComponent } from './signup/signup.component';
// import { SigupComponent } from './signup/signup.component';

export const routes: Routes = [


    // {path:'signup',component:SignupComponent},
    {path:'',component:LoginComponent},

    {path:"home",component:HomeComponent, canActivate:[AuthGuard]},  { path: 'failed', component: FailedComponent },

    {
        path:'login',component:LoginComponent
    },

    {
        path:'signup',component:SignupComponent
    },  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
{
    path:'money',component:TransferComponent
},{
    path:'payment',component:PaymentComponent
}, { path: 'transfer', component: TransferComponent },
{ path: 'payment', component: PaymentComponent },
{
    path:'balance', component:BalanceComponent
},

{
    path:'history',component:HistoryComponent
},{
    path:'phone',component:MobileComponent
},{
    path:'id',component:CategoriesComponent
},{
    path:'forget',component:ForgetComponent
},
{path:'reset',component:ResetComponent},
{
    path:'recharge',component:RechargeComponent
},{
    path:'notification',component:NotificationComponent
},{
    path:'admin',component:AdminComponent
}

];
