import {Routes} from '@angular/router';
import {authGuard} from "./guards/auth.guard";
import {AuthComponent} from "./pages/auth/auth.component";
import {MainComponent} from "./pages/main/main.component";
import {authenticatedGuard} from "./guards/authenticated.guard";
import {appResolver} from "./resolvers/app.resolver";

export const routes: Routes = [
  {
    path: 'auth', canActivate: [authenticatedGuard], component: AuthComponent
  },
  {
    path: '', canActivate: [authGuard],resolve: {data: appResolver}, component: MainComponent
  },
  {
    path: '**', redirectTo: 'auth', pathMatch: 'full'
  }
]
