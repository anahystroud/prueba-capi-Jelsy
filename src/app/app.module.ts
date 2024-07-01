import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AddEditContactComponent } from './components/add-edit-contact/add-edit-contact.component';
import { ListContactsComponent } from './components/list-contacts/list-contacts.component';
import { MsgConfComponent } from './components/shared/msg-conf/msg-conf.component';
import { AngularMaterialModule } from './components/shared/angular-material/angular-material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { ReactiveFormsModule } from '@angular/forms';
import { DetailedViewComponent } from './components/detailed-view/detailed-view.component';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    AddEditContactComponent,
    ListContactsComponent,
    MsgConfComponent,
    NavbarComponent,
    DetailedViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressBarModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
