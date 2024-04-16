import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
  selector: '[mustbeint]',
  standalone: true,
  providers: [ 
    {provide: NG_VALIDATORS, 
     useExisting: IntDirective, 
     multi: true }

  ]
})

export class IntDirective {

  constructor() { }

  validate(c: FormControl) {
    //get the value
    let v: number = +c.value;
    //if it is not a number
    if (isNaN(v)) {
      return { 'notint': true, 'message':'needs to be an integer'};
    }
    //is it an integer
    if (v % 1 != 0) {
      return { 'notint': true, 'message':'needs to be an integer'};
    }

    //no errors
    return null

  }

}
