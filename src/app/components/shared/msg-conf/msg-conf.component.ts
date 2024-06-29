import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-msg-conf',
  templateUrl: './msg-conf.component.html',
  styleUrl: './msg-conf.component.css'
})
export class MsgConfComponent {
  mensaje: string;
  btn = 'aceptar';
  constructor(public dialogRef : MatDialogRef<MsgConfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.mensaje = data.mensaje;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
