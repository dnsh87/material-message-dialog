import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export enum MessageDialogTypes {
  success,
  error,
  question,
  info,
  warning,
}

export enum MessageDialogActions {
  confirm,
  cancel,
  close,
}

const whiteSpace: string = ' ';
const dash: string = '-';
const typePlaceHolder: string = '%type%';
const classNamePre: string = 'swal2';
const classNameAnimate: string = [
  classNamePre,
  'animate',
  typePlaceHolder,
  'icon',
].join(dash);

@Component({
  selector: 'xmat-message-dialog',
  templateUrl: './xmat-message-dialog.component.html',
  styleUrls: [
    './xmat-message-dialog.component.scss',
    './xmat-message-dialog-animations.scss',
  ],
})
export class XmatMessageDialogComponent implements OnInit {
  md: any = {
    actions: MessageDialogActions,
    classNames: '',
    types: MessageDialogTypes,
    inner: {
      [MessageDialogTypes[MessageDialogTypes.success]]: '',
      [MessageDialogTypes[MessageDialogTypes.error]]: '',
      [MessageDialogTypes[MessageDialogTypes.warning]]: '!',
      [MessageDialogTypes[MessageDialogTypes.question]]: '?',
      [MessageDialogTypes[MessageDialogTypes.info]]: 'i',
    },
    type: '',
  };

  /**
   * TODO: add dynamic template binding
   * that would be really cool and reusable
   */
  constructor(
    private _dialogRef: MatDialogRef<XmatMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.md.type =
      this.data.type || MessageDialogTypes[MessageDialogTypes.info];
    this.md.classNames = classNamePre + dash + this.md.type;
    this.md.classNames += whiteSpace;
    this.md.classNames += classNameAnimate.replace(
      typePlaceHolder,
      this.md.type
    );
  }

  onActionClick(action): void {
    this._dialogRef.close(MessageDialogActions[action]);
  }
}
