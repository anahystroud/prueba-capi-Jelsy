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

  /*getContacts(pageNumber: number, pageSize: number) {

    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);

    return this._http.get(this.url, { params: params });
  }*/

  public getContacts(
    filter: string,
    pageNumber: number,
    pageSize: number
  ): Observable<ContactTable> {

    let params = new HttpParams();

    params = params.append('page', pageNumber);
    params = params.append('per_page', pageSize);
    params = params.append('search', filter);
  
    // const url = `${this.url}?page=${pageNumber}&per_page=${pageSize}`;
    // return this._http.get<ContactTable>(url);

    return this._http.get<ContactTable>(this.url, { params: params });
  }

  eliminarContacto(index: number){
    console.log(index);

    this._http.delete<any>(this.url+'/delete/'+index+'').subscribe();
  }

  agregarContacto(contact: Contact){
    // return this._http.post(this.url+'/store/'+contact+'');
    const body = JSON.stringify(contact);

    this._http.post<any>(this.url+'/store', contact).subscribe();





    

    // return this._http.post<any>(this.url+'/store', body);

    // return this._http.post<Contact>(this.url+'/store', body);
  }

  getContacto(index: number){
    console.log(index);
    
    return this._http.get(this.url+'/search/'+index+'');

    // return this.listContact[index];
  }

  editarContacto(contacto: Contact, idContacto: number){
    let body = JSON.stringify(contacto);
    console.log(body);

    this._http.post<any>(this.url+'/update/'+idContacto, contacto).subscribe();
  }
}