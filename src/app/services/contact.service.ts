import { Injectable } from '@angular/core';
import { Contact, ContactTable } from '../models/contact';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { U } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public url: string;
  public cont: string;
  httpClient: any;


  constructor(private _http:HttpClient) {
    this.url = "http://api-capi-jelsy.test/api/v1/contactos";
  }

  public getContacts(
    filter: string,
    pageNumber: number,
    pageSize: number
  ): Observable<ContactTable> {

    let params = new HttpParams();

    params = params.append('page', pageNumber);
    params = params.append('per_page', pageSize);
    params = params.append('search', filter);

    return this._http.get<ContactTable>(this.url, { params: params });
  }

  eliminarContacto(index: number){

    this._http.delete<any>(this.url+'/delete/'+index+'').subscribe();
  }

  agregarContacto(contact: Contact){
    const body = JSON.stringify(contact);

    this._http.post<any>(this.url+'/store', contact).subscribe();

  }

  getContacto(index: number){
    console.log(index);
    
    return this._http.get(this.url+'/search/'+index+'');
  }

  editarContacto(contacto: Contact, idContacto: number){
    let body = JSON.stringify(contacto);

    this._http.post<any>(this.url+'/update/'+idContacto, contacto).subscribe();
  }
}