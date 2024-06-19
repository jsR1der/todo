import {Routes} from '@angular/router';
import {AuthComponent} from "./pages/auth/auth.component";
import {MainComponent} from "./pages/main/main.component";
import {authGuard} from "./guards/auth.guard";

export const routes: Routes = [
  {
    path: 'auth', component: AuthComponent
  },
  {
    path: '', canActivate: [authGuard], component: MainComponent
  },
  {
    path: '**', redirectTo: 'auth', pathMatch: 'full'
  }
]
