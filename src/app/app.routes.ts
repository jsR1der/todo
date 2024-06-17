import {Routes} from '@angular/router';
import {LoginComponent} from "./shared/components/login/login.component";
import {MainComponent} from "./shared/components/main/main.component";
import {authGuard} from "./shared/auth.guard";

export const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', canActivate: [authGuard], component: MainComponent
  },
  {
    path: '**', redirectTo: 'login', pathMatch: 'full'
  }
]
