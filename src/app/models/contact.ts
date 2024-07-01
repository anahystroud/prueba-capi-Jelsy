export class Contact{
    // id: string;
    name: string;
    telefonos: string;
    emails: string;
    direcciones: string;
}


export interface ContactTable {
    data: Contact[];
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  }