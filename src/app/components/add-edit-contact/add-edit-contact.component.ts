import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-edit-contact',
  templateUrl: './add-edit-contact.component.html',
  styleUrl: './add-edit-contact.component.css'
})
export class AddEditContactComponent {
  emailFormControl: any;
  idContacto: any;
  accion = 'Crear';
  myForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private contactService: ContactService,
    private route: Router,
    private snackBar: MatSnackBar,
    private aRoute: ActivatedRoute

  ){
    this.myForm = this.fb.group ({
      nombreCompleto: ['', [Validators.required, Validators.maxLength(25)]],
      telefono: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      email: ['',[Validators.required, Validators.email]],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
    });

    this.idContacto = this.aRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    if(this.idContacto !== undefined){
      this.accion = 'Editar';
      this.esEditar();
    }
  }

  guardarContacto(){
    console.log(this.myForm);
    const contacto: Contact = {
      nombreCompleto: this.myForm.get('nombreCompleto').value,
      telefono: this.myForm.get('telefono').value,
      email: this.myForm.get('email').value,
      direccion: this.myForm.get('direccion').value
    };

    if(this.idContacto !== undefined){
      this.editarContacto(contacto);
    }else{
      this.agregarContacto(contacto);
    }
  
  }

  agregarContacto(contacto: Contact){
    this.contactService.agregarContacto(contacto);
    this.snackBar.open('El contacto se almacenó correctamente.', '', {
      duration: 3000
    });
    this.route.navigate(['/']);
  }

  editarContacto(contacto: Contact){
    this.contactService.editarContacto(contacto, this.idContacto);
    this.snackBar.open('El contacto se actualizó correctamente.', '', {
      duration: 3000
    });
    this.route.navigate(['/']);
  }

  esEditar(){
    const contacto: Contact = this.contactService.getContacto(this.idContacto);
    console.log(contacto);
    this.myForm.patchValue({
      nombreCompleto: contacto.nombreCompleto,
      telefono: contacto.telefono,
      email: contacto.email,
      direccion: contacto.direccion
    });
  }

}
