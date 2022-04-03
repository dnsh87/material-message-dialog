import { Component } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef,
} from '@angular/material';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import {
  XmatMessageDialogComponent,
  MessageDialogTypes,
} from './xmat-message-dialog.component';

@Component({
  selector: 'error-dialog-example',
  styleUrls: ['error-dialog-example.css'],
  templateUrl: 'error-dialog-example.html',
})
export class ErrorDialogExample {
  types = MessageDialogTypes;
  constructor(protected _dialog: MatDialog) {}

  openConfirmDialog(
    type: MessageDialogTypes = this.types.info,
    disableClose: boolean = false
  ): Observable<boolean> {
    let dialogConfig = new MatDialogConfig();
    _.extend(dialogConfig, {
      width: '400px',
      data: {
        type: type,
        action: 'alert',
        title: 'Hello Alert',
      },
      disableClose: disableClose,
    });
    // Open dialog and pass data plus options
    let dialogRef = this._dialog.open(XmatMessageDialogComponent, dialogConfig);

    return new Observable((observer) => {
      // Catch result
      dialogRef.afterClosed().subscribe((result) => {
        observer.next(result);
        observer.complete();
      });
    });
  }
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
