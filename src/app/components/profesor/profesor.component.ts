import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

// Sweet Alert
import swal from 'sweetalert';

// Models
import { Usuario, NuevoProfesor, ActualizarProfesor } from '../../models/usuario.model';

// Services
import { ProfesorService } from 'src/app/services/services.index';

// Lenguaje DatePicker
import { defineLocale, esLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
defineLocale('es', esLocale);

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

  @Output() exitoso: EventEmitter<Usuario> = new EventEmitter();

  profesor: Usuario;
  protected click = false;
  frmProfesor: FormGroup;
  protected titulo: string;

  constructor(
    private localeService: BsLocaleService,
    private bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private profesorService: ProfesorService
  ) { }

  hide(): void {
    if (this.frmProfesor.dirty) {
      swal({
        title: '¿Está seguro?',
        text: 'Estas a punto de perder la información ingresada.',
        icon: 'info',
        buttons: ['Cancelar', 'Aceptar'],
        dangerMode: true,
      })
        .then(willDelete => {
          if (willDelete) {
            this.bsModalRef.hide();
          }
        });
      return;
    } else {
      this.bsModalRef.hide();
    }
  }

  mostrarMensajeError(form: FormGroup, name: string, type: string) {
    const input = form.controls[name];
    return ((input.touched || input.dirty) || this.click) && input.hasError(type);
  }

  ngOnInit() {
    this.localeService.use('es');

    this.frmProfesor = this.formBuilder.group({
      avatar: [''],
      nombre: ['', [Validators.required]],
      apaterno: ['', [Validators.required]],
      amaterno: [''],
      fechaNacimiento: [null, [Validators.required]],
      correoElectronico: ['', [CustomValidators.email]],
      sexo: [null, [Validators.required]],
    });

    if (this.profesor) {
      // const prof = this.profesor;
      // delete this.profesor.id;
      this.frmProfesor.controls.nombre.setValue(this.profesor.nombre);
      this.frmProfesor.controls.apaterno.setValue(this.profesor.apaterno);
      this.frmProfesor.controls.amaterno.setValue(this.profesor.amaterno);
      this.frmProfesor.controls.fechaNacimiento.setValue(new Date(this.profesor.fechaNacimiento));
      this.frmProfesor.controls.sexo.setValue(this.profesor.sexo);
      this.frmProfesor.controls.correoElectronico.setValue(this.profesor.correoElectronico);

      // this.frmProfesor.setValue(this.profesor);
      this.frmProfesor.controls.correoElectronico.updateValueAndValidity();
      this.frmProfesor.markAsPristine();
      // this.profesor = prof;
    }
  }

  save() {
    this.click = true;

    if (this.frmProfesor.invalid) {
      return false;
    }

    let form = Object.assign({});
    form = Object.assign(form, this.frmProfesor.value);
    if (this.profesor) {
      // Actualizar profesor.
      const entity = form as ActualizarProfesor;
      entity.id = this.profesor.id;
      console.log(entity);

      this.profesorService.actualizar(entity)
        .subscribe((entidad: Usuario) => {
          this.exitoso.emit(entidad);
          this.bsModalRef.hide();
        });
    } else {
      // Crear nuevo profesor
      const entity = form as NuevoProfesor;
      this.profesorService.crear(entity)
        .subscribe((entidad: Usuario) => {
          this.exitoso.emit(entidad);
          this.bsModalRef.hide();
        });
    }
  }

  validarControl(form: FormGroup, name: string): number {
    const input = form.controls[name];
    if (input.invalid && ((input.touched || input.dirty) || this.click)) {
      return 1; // is invalid
    } else if (input.valid && input.validator != null) {
      return 0; // is valid
    } else {
      return 2; // not is required
    }
  }
}
