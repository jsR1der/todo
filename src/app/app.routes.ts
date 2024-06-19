import {Routes} from '@angular/router';
import {authGuard} from "./guards/auth.guard";
import {AuthComponent} from "./pages/auth/auth.component";
import {MainComponent} from "./pages/main/main.component";

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
