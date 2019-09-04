import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

// Models
import { CrearAlumno } from '../../models/alumno.model';
import { RespuestaApi } from '../../models/respuestamodel';

// Services
import { AlumnoService } from '../../services/alumno/alumno.service';


@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {
  frmDatosPersonales: FormGroup;
  // trigger: Subject<void> = new Subject<void>();
  submitted = false;
  // videoOptions: MediaTrackConstraints = {
  //   width: { ideal: 1024 },
  //   height: { ideal: 576 }
  // };
  // webcamImage: WebcamImage = null;

  constructor(
    private alumnoService: AlumnoService,
    private formBuilder: FormBuilder,
  ) { }
  invokeEvent(place: object) {
    console.log(place);
  }

  mostrarMensajeError(form: FormGroup, name: string, type: string) {
    const input = form.controls[name];
    return ((input.touched || input.dirty) || this.submitted) && input.hasError(type);
  }

  // handleImage(webcamImage: WebcamImage): void {
  //   console.log('received webcam image', webcamImage);
  //   this.webcamImage = webcamImage;
  // }

  ngOnInit() {
    this.frmDatosPersonales = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apaterno: ['', [Validators.required]],
      amaterno: [''],
      fechaNacimiento: [null, [Validators.required]],
      lugarNacimiento: [''],
      nacionalidad: ['', [Validators.required]],
      curp: ['', [Validators.required]],
      correoElectronico: ['', [CustomValidators.email]],
      sexo: [null, [Validators.required]],
      domicilio: this.formBuilder.group({
        calle: ['', [Validators.required]],
        numeroExterior: ['', [Validators.required]],
        numeroInterior: [''],
        codigoPostal: ['', [Validators.required]],
        colonia: ['', [Validators.required]],
        delegacion: ['', [Validators.required]],
        estado: ['', [Validators.required]],
      }),
      adicionales: this.formBuilder.group({
        estadoCivil: [''],
        hijos: [null],
        viveConP: [null],
        viveConM: [null],
        trabaja: [false],
        hermanos: [false],
        hhombres: [''],
        hmujeres: [''],
        empresa: [''],
        puesto: [''],
        telefonoTrabajo: ['']
      }),
      mama: this.formBuilder.group({
        nombre: ['', [Validators.required]],
        apaterno: ['', [Validators.required]],
        amaterno: [''],
        telefono: [''],
        correoElectronico: ['', [CustomValidators.email]]
      }),
      papa: this.formBuilder.group({
        nombre: ['', [Validators.required]],
        apaterno: ['', [Validators.required]],
        amaterno: [''],
        telefono: [''],
        correoElectronico: ['', [CustomValidators.email]]
      })
    });

    //#region Validacion de datos si tiene hermanos es: true
    this.frmDatosPersonales.controls.adicionales.get('hermanos').valueChanges
      .subscribe((value: boolean) => {
        if (value) {
          this.frmDatosPersonales.controls.adicionales
            .get('hhombres').setValidators([Validators.compose([Validators.required, Validators.min(0)])]);
          this.frmDatosPersonales.controls.adicionales
            .get('hmujeres').setValidators([Validators.compose([Validators.required, Validators.min(0)])]);
        } else {
          this.frmDatosPersonales.controls.adicionales.get('hhombres').setValue(null);
          this.frmDatosPersonales.controls.adicionales.get('hhombres').clearValidators();

          this.frmDatosPersonales.controls.adicionales.get('hmujeres').setValue(null);
          this.frmDatosPersonales.controls.adicionales.get('hmujeres').clearValidators();
        }

        this.frmDatosPersonales.controls.adicionales.get('hhombres').updateValueAndValidity();
        this.frmDatosPersonales.controls.adicionales.get('hmujeres').updateValueAndValidity();
      });
    //#endregion

    //#region Validacion de datos si tiene hermanos es: true
    this.frmDatosPersonales.controls.adicionales.get('trabaja').valueChanges
      .subscribe((value: boolean) => {
        if (value) {
          this.frmDatosPersonales.controls.adicionales
            .get('empresa').setValidators([Validators.compose([Validators.required])]);
          this.frmDatosPersonales.controls.adicionales
            .get('puesto').setValidators([Validators.compose([Validators.required])]);
          this.frmDatosPersonales.controls.adicionales
            .get('telefonoTrabajo').setValidators([Validators.compose([Validators.required])]);
        } else {
          this.frmDatosPersonales.controls.adicionales.get('empresa').setValue(null);
          this.frmDatosPersonales.controls.adicionales.get('empresa').clearValidators();

          this.frmDatosPersonales.controls.adicionales.get('puesto').setValue(null);
          this.frmDatosPersonales.controls.adicionales.get('puesto').clearValidators();

          this.frmDatosPersonales.controls.adicionales.get('telefonoTrabajo').setValue(null);
          this.frmDatosPersonales.controls.adicionales.get('telefonoTrabajo').clearValidators();
        }

        this.frmDatosPersonales.controls.adicionales.get('empresa').updateValueAndValidity();
        this.frmDatosPersonales.controls.adicionales.get('puesto').updateValueAndValidity();
        this.frmDatosPersonales.controls.adicionales.get('telefonoTrabajo').updateValueAndValidity();
      });
    //#endregion
  }

  save(): void {
    this.submitted = true;

    if (this.frmDatosPersonales.invalid) {
      return;
    }

    let form = Object.assign({});
    form = Object.assign(form, this.frmDatosPersonales.value);
    const entity = form as CrearAlumno;

    console.log(entity);

    this.alumnoService.crear(entity)
      .subscribe((res: RespuestaApi) => {
        console.log(res);
      });
  }

  // public get triggerObservable(): Observable<void> {
  //   return this.trigger.asObservable();
  // }

  // triggerSnapshot(): void {
  //   this.trigger.next();
  // }

  validarControl(form: FormGroup, name: string): number {
    const input = form.controls[name];
    if (input.invalid && ((input.touched || input.dirty) || this.submitted)) {
      return 1; // is invalid
    } else if (input.valid && input.validator != null) {
      return 0; // is valid
    } else {
      return 2; // not is required
    }
    // return ((input.touched || input.dirty) || this.submitted) && input.invalid;
  }
}
