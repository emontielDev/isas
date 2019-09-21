import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {

  transform(avatar: string, tipo: string): any {
    let url = '/api/avatar/';
    // console.log('avatar', avatar);
    // console.log('tipo', tipo);
    if (!avatar) {
      return url;
    }

    if (avatar.indexOf('https') >= 0 || avatar.indexOf('data:image/') >= 0) {
      return avatar;
    }

    switch (tipo) {
      case 'alumno':
        url += 'alumnos/' + avatar;
        break;
      case 'profesor':
        url += 'profesores/' + avatar;
        break;
      default:
        console.log(`El tipo ${tipo} no existe como colección.`);
        break;
    }
    return url;
  }

}
