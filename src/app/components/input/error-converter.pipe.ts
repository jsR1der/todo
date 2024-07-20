import {Pipe, PipeTransform} from '@angular/core';
import {ValidationErrors} from "@angular/forms";

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
      const errorMessage = errors[i];
      if (errorMessage === true) {
        res.push(`*${i}`)
        continue
      }
      res.push(errors[i])
    }
    return res;
  }

}
