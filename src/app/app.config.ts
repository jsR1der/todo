import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideStore} from '@ngrx/store';
import {provideNativeDateAdapter} from "@angular/material/core";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "./interceptors/auth/auth.interceptor";
import {errorInterceptor} from "./interceptors/error/error.interceptor";
import {loadingInterceptor} from "./interceptors/loading/loading.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideStore(), provideNativeDateAdapter(), provideHttpClient(withInterceptors([loadingInterceptor, authInterceptor, errorInterceptor]))]
};
