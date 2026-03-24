import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {Button, ButtonSeverity} from 'primeng/button';

@Component({
  selector: 'confirm-dialog',
  imports: [
    Dialog,
    Button
  ],
  templateUrl: 'confirm-dialog.html'
})
export class ConfirmDialog {
  @Input() visible: boolean = false;
  @Input() text: string;
  @Input() confirmLabel: string = 'Confirm';
  @Input() confirmSeverity: ButtonSeverity = 'primary';
  @Input() cancelLabel: string = 'Cancel';
  @Input() cancelSeverity: ButtonSeverity = 'secondary';

  @Output() confirm: EventEmitter<boolean> = new EventEmitter();
}
