import {Component} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipEditedEvent, MatChipInputEvent, MatChipGrid } from '@angular/material/chips';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidationErrors, AbstractControl } from '@angular/forms';
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
  // @ViewChild('chipGrid') chipGrid: MatChipGrid;
  chipGrid: MatChipGrid;
  emailFormControl: any;
  idContacto: any;
  accion = 'Crear';
  myForm: FormGroup;
  contact: any;

  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private fb: FormBuilder, 
    private contactService: ContactService,
    private route: Router,
    private snackBar: MatSnackBar,
    private aRoute: ActivatedRoute
  ) {

    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(40)]],
      telefonos: this.fb.array([], [this.tagValidatorRequired]),
      emails: this.fb.array([], [this.tagValidatorRequired]),
      direcciones: this.fb.array([], [this.tagValidatorRequired])
    });

    this.idContacto = this.aRoute.snapshot.params['id'];
  }


  ngOnInit(): void {
    if (this.idContacto !== undefined) {
      this.accion = 'Editar';
      this.esEditar();
    }
  }

  initItem(name: string): FormControl {
    return this.fb.control(name);
  }


  tagValidatorRequired(control: AbstractControl): ValidationErrors | null {
    return (control.value && control.value.length === 0)
      ? { required: true }
      : null;
  };


  getControls(form: FormGroup, name: string) {
    return (form.get(name) as FormArray).controls;
  }


  add(event: MatChipInputEvent, form: FormGroup, name: string): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      let evaluator = this.matchStr(value, name );
      if ( evaluator ) {
        const control = form.get(name) as FormArray;
        control.push(this.initItem(value.trim()));
      }
    }

    if (input) {
      input.value = '';
    }
  }


  remove(form: FormGroup, element: any, name: string) {
    const index = (<FormArray>form.get(name)).controls.findIndex(x => x.value === element.value);

    (<FormArray>form.get(name)).removeAt(index);
  }


  edit(element: any, event: MatChipEditedEvent, form: FormGroup, name: string) {
    const value = event.value.trim();
  
    if (!value) {
      this.remove(form, element, name);
      return;
    }

    const index = (<FormArray>form.get(name)).controls.findIndex(x => x.value === element.value);

    if (index >= 0) {
      (<FormArray>form.get(name)).at(index).patchValue(value);
    }
  }


  matchStr(str: string, aux: string = null): any {
    switch(aux) {
      case 'telefonos': {
        const reg = new RegExp(/^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/);
        return reg.test(str);
        break; 
      }
      case 'emails': { 
        const reg = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
        return reg.test(str);
        break;
      } 
      default: { 
        return true;
        break; 
      } 
   }
  }



  guardarContacto() {
    const contacto: Contact = {
      name: this.myForm.get('name').value,
      telefonos: this.myForm.get('telefonos').value,
      emails: this.myForm.get('emails').value,
      direcciones: this.myForm.get('direcciones').value
    };

    if (this.idContacto !== undefined) {
      this.editarContacto(contacto);
    }
    else {
      this.agregarContacto(contacto);
    }
  }

  agregarContacto(contacto: Contact) {
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

  esEditar() {
    this.contactService.getContacto(this.idContacto).subscribe(
      data => {
        this.contact = data;
        this.contact.telefonos.forEach( (value: any) => {
          const control = this.myForm.get('telefonos') as FormArray;
          control.push(this.initItem(value.telefono));
        });
        this.contact.emails.forEach( (value: any) => {
          const control = this.myForm.get('emails') as FormArray;
          control.push(this.initItem(value.email));
        });
        this.contact.direcciones.forEach( (value: any) => {
          const control = this.myForm.get('direcciones') as FormArray;
          control.push(this.initItem(value.direccion));
        });
        this.myForm.patchValue({
          name: this.contact.name
        });
      }
    );
  }

}