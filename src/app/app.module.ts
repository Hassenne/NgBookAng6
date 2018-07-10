import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
//import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ROUTES } from './routes/routes';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthedGuard } from './guards/authed.guard';
import { NotifyComponent } from './notify/notify.component';
import { NotifyService } from './services/notify.service';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    DashboardComponent,
    LoginComponent,
    NotifyComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [AuthService,AuthGuard,AuthedGuard,NotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
