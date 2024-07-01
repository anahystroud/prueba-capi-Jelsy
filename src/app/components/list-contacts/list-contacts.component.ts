import {Component, ViewChild, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

import { merge, Observable, of as observableOf, pipe } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

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
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrl: './list-contacts.component.css'
})

export class ListContactsComponent implements OnInit{
  displayedColumns: string[] = ['name', 'telefonos', 'emails', 'direcciones', 'acciones'];
  listContacto: Contact[];
  dataSource = new MatTableDataSource<Contact>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private contactService: ContactService, public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private route: Router
  ){ }

  ngOnInit(): void {
    //
  }

  isLoading = false;
  totalData: number;
  pageSize = 25;
  pageSizes = [10, 25, 50, 100, 250];

  searchKeywordFilter = new FormControl();

  getTableData$(filter: string, pageNumber: number, pageSize: number) {
    return this.contactService.getContacts(filter, pageNumber, pageSize);
  }

  ngAfterViewInit() {
    this.cargarContactos();
    this.cargarContactos();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  cargarContactos() {
    this.isLoading = true;

    this.dataSource.paginator = this.paginator;

    merge( this.searchKeywordFilter.valueChanges, this.paginator.page )
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          var filterValue = this.searchKeywordFilter.value == null ? '' : this.searchKeywordFilter.value;
          return this.getTableData$(
            filterValue,
            this.paginator.pageIndex + 1,
            this.paginator.pageSize
          )
          .pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          if (data == null) return [];
          this.totalData = data.total;
          this.isLoading = false;
          return data.data;
        })
      )
      .subscribe((data) => {
        this.listContacto = data;
        this.dataSource = new MatTableDataSource(this.listContacto);
      });

    // this.contactService.getContacts().subscribe(
    //   data => {
    //     this.contactos = data;
    //     this.dataSource = new MatTableDataSource(this.contactos);
    //     this.dataSource.paginator = this.paginator;
    //   }
    // );

    this.isLoading = false;
  }

  eliminarContacto(index: number) {
    const dialogRef = this.dialog.open(MsgConfComponent, {
      width: '350px',
      data: {mensaje: 'Se eliminará el contacto al confirmar.'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'aceptar') {
        this.contactService.eliminarContacto(index);
        this.cargarContactos();
        this.snackBar.open('El contacto se eliminó correctamente.', '', {
          duration: 3000
        });
        this.cargarContactos();
      }

      
      
    });
   
  }

}


