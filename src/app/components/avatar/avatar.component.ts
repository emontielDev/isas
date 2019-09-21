import { Component, OnInit, Input, ElementRef, ViewChild, OnDestroy, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// Models
import { Usuario } from '../../models/usuario.model';

// SweetAlert
import swal from 'sweetalert';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AvatarComponent),
      multi: true
    }
  ]
})
export class AvatarComponent implements OnInit, ControlValueAccessor, OnDestroy {

  // Eventos
  @Output() Editar: EventEmitter<Usuario> = new EventEmitter();
  @Output() CambiarAvatar: EventEmitter<{ avatar: string, instancia: AvatarComponent }> = new EventEmitter();

  @ViewChild('file', { static: false }) flImagen: ElementRef;

  @Input() cssClass: string;
  @Input() mostrarEdicion: boolean;
  @Input() usuario: Usuario;
  @Input() titulo: string;
  @Input() tipo: string;

  protected imgTemporal: string;
  protected deshabilitado: boolean;

  onChange: (entity: string) => {};
  onTouched: () => {};

  get value(): string {
    return this.imgTemporal;
  }

  set value(value: string) {
    // this.imgTemporal = value;
    this.onChange(value);
    this.onTouched();
  }

  constructor() { }

  cambiarAvatar() {
    this.flImagen.nativeElement.click();
  }

  public limpiarTemporal() {
    this.imgTemporal = null;
  }

  editar() {
    this.Editar.emit(this.usuario);
    // if (this.usuario) {
    //   if (this.tipo) {
    //     this.bsModalRef = this.modalService.show(ProfesorComponent,
    //       { ignoreBackdropClick: true, initialState: { profesor }, keyboard: false, class: 'modal-lg' });
    //   }
    // }
  }

  handlerCambiarAvatar(event: any) {
    const file = event.target.files[0] as File;

    if (!file) {
      return;
    }

    if (file.type.indexOf('image') < 0) {
      swal('Archivo no permitido', 'El archivo seleccionado no es una imagen.', 'warning');
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = (res: any) => {
      this.imgTemporal = res.target.result;
      this.CambiarAvatar.emit({ avatar: this.imgTemporal, instancia: this });
      if (this.onChange) {
        this.onChange(this.imgTemporal);
      }
    };

    fileReader.readAsDataURL(file);
  }

  ngOnDestroy(): void {
    this.imgTemporal = null;
    this.usuario = null;
  }

  ngOnInit() {

  }

  //#region Reactive Forms
  writeValue(imagen: string): void {
    if (imagen) {
      // this.imgTemporal = imagen;
      this.onChange(imagen);
    }
    // else {
    //   this.imgTemporal = null;
    // }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.deshabilitado = isDisabled;
  }
  //#endregion

}
