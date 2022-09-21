import { LicenseService } from './shared/services/license.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserService } from './shared/services/user.service';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { LicenseComponent } from './license/license.component';
import { appRoutes } from './routes';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    LicenseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [UserService, 
    LicenseService,
    // AuthGuard,
    // ,
    // {
    //   provide : HTTP_INTERCEPTORS,
    //   useClass : AuthInterceptor,
    //   multi : true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }