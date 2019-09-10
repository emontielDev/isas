import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {

  transform(img: string, tipo: string): any {
    let url = '/api/avatar/';
    if (!img) {
      return url;
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {
      case 'usuario':
        url += 'usuarios/' + img;
        break;
      default:
        console.log(`El tipo ${tipo} no existe como colección.`);
        break;
    }
    return url;
  }

}
