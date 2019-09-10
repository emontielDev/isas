import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';



// Component
import { ProfesorComponent } from '../../components/profesor/profesor.component';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
/*export class ProfesoresComponent implements OnInit {

  bsModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  add(): void {
    this.bsModalRef = this.modalService.show(ProfesorComponent,
      { ignoreBackdropClick: true, keyboard: false, class: 'modal-lg' });
  }

}*/

export class ProfesoresComponent implements OnInit {
  frmDatosProfesores: FormGroup;
  // trigger: Subject<void> = new Subject<void>();
  submitted = false;
  // videoOptions: MediaTrackConstraints = {
  //   width: { ideal: 1024 },
  //   height: { ideal: 576 }
  // };
  // webcamImage: WebcamImage = null;
  constructor(
    private formBuilder: FormBuilder,
  ) { }
  invokeEvent(place: object) {
    console.log(place);
  }

  mostrarMensajeError(form: FormGroup, name: string, type: string) {
    const input = form.controls[name];
    return ((input.touched || input.dirty) || this.submitted) && input.hasError(type);
  }


ngOnInit() {
  this.frmDatosProfesores = this.formBuilder.group ({
    nombre: ['', [Validators.required]],
    apaterno: ['', [Validators.required]],
    amaterno: ['', [Validators.required]],
    fechanacimiento: [null, [Validators.required]],
    correoelectronico: ['', [CustomValidators.email]],
    sexo: ['', [Validators.required]],
    });
  }
  save(): void {
    this.submitted = true;
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