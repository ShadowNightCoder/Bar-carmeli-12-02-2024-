import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/component/default-components/error-dialog/error-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private dialog: MatDialog) { }


  showErrorDialog(message: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: { message },
      width: '400px'
    });
  }
}
