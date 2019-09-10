import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

// Models
import { Alumno } from '../../models/alumno.model';

// SweetAlert
import swal from 'sweetalert';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  @ViewChild('file', { static: false }) flImagen: ElementRef;

  @Input() cssClass: string;
  @Input() usuario: Alumno;
  @Input() titulo: string;
  @Input() tipo: string;

  protected imgTemp: string;
  constructor() { }

  cambiarAvatar() {
    this.flImagen.nativeElement.click();
  }

  handlerCambiarAvatar(event: any) {
    const file = event.target.files[0] as File;

    if (!file) {
      // this.imgTemp = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {
      swal('Archivo no permitido', 'El archivo seleccionado no es una imagen.', 'warning');
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = (res: any) => {
      this.imgTemp = res.target.result;
    };

    fileReader.readAsDataURL(file);
  }

  ngOnInit() {
  }

}
