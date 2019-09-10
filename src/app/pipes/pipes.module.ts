import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarPipe } from './avatar.pipe';



@NgModule({
  declarations: [AvatarPipe],
  exports: [AvatarPipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
