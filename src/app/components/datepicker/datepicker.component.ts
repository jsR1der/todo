import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {
  MatDatepicker,
  MatDatepickerActions,
  MatDatepickerApply,
  MatDatepickerCancel,
  MatDatepickerInput,
  MatDatepickerInputEvent,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {InputConfig} from "../input/input.model";

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerActions,
    MatInput,
    MatLabel,
    MatHint,
    MatDatepickerInput,
    MatButton,
    MatDatepickerCancel,
    MatDatepickerApply,
    MatIcon
  ],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DatepickerComponent {
  @Input({required: true}) config: InputConfig<string>;
  @Output() dateChange = new EventEmitter<string>()

  public onDateChange(event: MatDatepickerInputEvent<Date>): void {
    const isoString = event.value?.toISOString();
    if (isoString) {
      this.dateChange.next(isoString.slice(0,isoString.indexOf('T')))
    }
    return;
  }
}
