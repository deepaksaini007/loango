import { Directive, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appTextToNumber]',
  host: { '(keyup)': 'doSomething($event)' },
  providers:[{
    provide:NG_VALUE_ACCESSOR,
    useExisting: forwardRef(()=>TextToNumberDirective),
    multi:true
  }]
})
export class TextToNumberDirective implements ControlValueAccessor {

  constructor(public _el: ElementRef) { }
  private writeToForm :any;
  writeValue(value: any): void {
    this._el.nativeElement.value = value
  }
  registerOnChange(fn: (value: any) => void) {
    this.writeToForm = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {

  }
  doSomething(event: Event) {
    this.writeToForm(+((<HTMLInputElement>event.target).value));
  }

}
