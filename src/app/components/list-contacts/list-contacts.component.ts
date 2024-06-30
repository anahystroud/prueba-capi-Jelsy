import {Component, ViewChild, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MsgConfComponent } from '../shared/msg-conf/msg-conf.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrl: './list-contacts.component.css'
})

export class ListContactsComponent implements OnInit{
  displayedColumns: string[] = ['name', 'telefonos', 'emails', 'direcciones', 'acciones'];
  listContacto: Contact[];
  dataSource = new MatTableDataSource<Contact>();

  contactos: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private contactService: ContactService, public dialog: MatDialog,
    public snackBar: MatSnackBar
  ){ }

  ngOnInit(): void {
    this.cargarContactos();
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  cargarContactos() {
    this.contactService.getContacts().subscribe(
      data => {
        this.contactos = data;
        console.log(data);
        this.dataSource = new MatTableDataSource(this.contactos);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  eliminarContacto(index: number){

    const dialogRef = this.dialog.open(MsgConfComponent, {
      width: '350px',
      data: {mensaje: 'Se eliminará el contacto al confirmar.'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'aceptar'){
        this.contactService.eliminarContacto(index);
        this.cargarContactos();
        this.snackBar.open('El contacto se eliminó correctamente.', '', {
          duration: 3000
        });
      }
      
    });
   
  }

}


