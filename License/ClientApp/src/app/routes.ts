import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { LicenseComponent } from './license/license.component'
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard'

export const appRoutes: Routes = [
    // { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
    // { path: 'license', component: LicenseComponent, canActivate:[AuthGuard]},
    { path: 'home', component: HomeComponent},
    { path: 'license', component: LicenseComponent},
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    { path : '', redirectTo:'/login', pathMatch : 'full'}
    
];