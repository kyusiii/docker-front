import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {Restaurant} from "../dtos/responses/restaurant.dto";

@Directive({
  selector: '[appMoyenneColoration]'
})
export class MoyenneColorationDirective {

  constructor(private _el: ElementRef, private _renderer: Renderer2) {
  }

  @Input()
  set appMoyenneColoration(value: Restaurant) {
    if (value.moyenne > 2) {
      this._renderer.setStyle(this._el.nativeElement, 'background-color', 'yellow')
    } else if (value.moyenne < 1 && value.moyenne >= 0) {
      this._renderer.setStyle(this._el.nativeElement, 'background-color', 'red')
    } else {
      this._renderer.setStyle(this._el.nativeElement, 'background-color', 'none')
    }
  }

}
