import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public url: string;


  listContact: Contact[] = [
    { 
      nombreCompleto: 'Israel Torres',
      telefono: '7773416895', 
      email: 'israel.tg@gmail.com', 
      direccion: 'Cuautla Morelos' 
    },
    { 
      nombreCompleto: 'Jelsy Uribe',
      telefono: '775502182', 
      email: 'anahystroud@gmail.com', 
      direccion: 'Zacatepec Morelos' 
    },
    { 
      nombreCompleto: 'Crystal Uribe',
      telefono: '775502182', 
      email: 'anahystroud@gmail.com', 
      direccion: 'Zacatepec Morelos' 
    },
    { 
      nombreCompleto: 'Leon Israel Torres Uribe',
      telefono: '775502182', 
      email: 'anahystroud@gmail.com', 
      direccion: 'Zacatepec Morelos' 
    },
    { 
      nombreCompleto: 'Katerine Uribe',
      telefono: '775502182', 
      email: 'anahystroud@gmail.com', 
      direccion: 'Zacatepec Morelos' 
    },
    { 
      nombreCompleto: 'Rosaura Rocio Rivero P.',
      telefono: '775502182', 
      email: 'anahystroud@gmail.com', 
      direccion: 'Zacatepec Morelos' 
    }

  ];
  httpClient: any;

  constructor(private _http:HttpClient) {
    this.url = "https://jsonplaceholder.typicode.com/posts";
  }

  getContacts(){
    return this.listContact.slice();

    // return this.httpClient.get(this.url).map((res: { json: () => any; }) => res.json());

  }

  eliminarContacto(index: number){
    this.listContact.splice(index, 1);
  }

  agregarContacto(contact: Contact){
    this.listContact.unshift(contact);
  }

  getContacto(index: number){
    return this.listContact[index];
  }

  editarContacto(contacto: Contact, idContacto: number){
    this.listContact[idContacto].nombreCompleto = contacto.nombreCompleto;
    this.listContact[idContacto].telefono = contacto.telefono;
    this.listContact[idContacto].email = contacto.email;
    this.listContact[idContacto].direccion = contacto.direccion;
  }
}