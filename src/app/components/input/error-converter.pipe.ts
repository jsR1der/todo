import {Pipe, PipeTransform} from '@angular/core';
import {ValidationErrors} from "@angular/forms";
import {capitalize} from "lodash";

@Pipe({
  name: 'errorConverter',
  standalone: true,
  pure: true
})
export class ErrorConverterPipe implements PipeTransform {

  transform(errors: ValidationErrors | null): string[] {
    if (!errors) {
      return [];
    }
    const res: string[] = [];
    for (const i in errors) {
      const error = errors[i];
      if (error instanceof Object) {
        let complicatedError: string = '* ';
        for (const j in error) {
          complicatedError += `${capitalize(j)}: ${error[j]} `
        }
        res.push(complicatedError)
      }
      if (error === true) {
        res.push(`*${capitalize(i)}`)
      }
    }
    return res;
  }

}
