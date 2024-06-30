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
  public cont: string;
  httpClient: any;


  constructor(private _http:HttpClient) {
    // this.url = "https://jsonplaceholder.typicode.com/posts";
    this.url = "http://api-capi-jelsy.test/api/v1/contactos";
  }

  getContacts() {
    return this._http.get(this.url);
    // return this.listContact.slice();
  }

  eliminarContacto(index: number){
    // this.listContact.splice(index, 1);
  }

  agregarContacto(contact: Contact){
    // this.listContact.unshift(contact);
  }

  getContacto(index: number){
    console.log(index);
    return this._http.get(this.url+'/edit/'+index+'');

    // return this.listContact[index];
  }

  editarContacto(contacto: Contact, idContacto: number){
    // this.getContacto(idContacto).name = contacto.name;
    // this.getContacto(idContacto).telefonos = contacto.telefonos;
    // this.getContacto(idContacto).emails = contacto.emails;
    // this.getContacto(idContacto).direcciones = contacto.direcciones;
  }
}