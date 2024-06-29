import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditContactComponent } from './components/add-edit-contact/add-edit-contact.component';
import { ListContactsComponent } from './components/list-contacts/list-contacts.component';
import { DetailedViewComponent } from './components/detailed-view/detailed-view.component';

const routes: Routes = [
  { path: 'add', component: AddEditContactComponent },
  { path: 'view/:id', component: DetailedViewComponent },
  { path: '', component: ListContactsComponent },
  { path: 'edit/:id', component: AddEditContactComponent },
  { path: '**', component: ListContactsComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
