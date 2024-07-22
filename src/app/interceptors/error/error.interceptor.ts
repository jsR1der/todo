import {HttpInterceptorFn} from '@angular/common/http';
import {catchError, take, tap} from "rxjs";
import {inject} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../dialogs/error-dialog/error-dialog.component";
import {LoadingService} from "../loading/loading.service";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const dialog = inject(MatDialog)
  const loadingService = inject(LoadingService);
  return next(req).pipe(catchError((e) => {
    return dialog.open(ErrorDialogComponent, {
      minWidth: "350px",
      data: {
        message: e.error.message
      }
    }).afterClosed().pipe(tap(() => {
      loadingService.setLoading(false, req.url);
    }), take(1))
  }))

};
