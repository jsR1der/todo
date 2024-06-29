import {Component, ViewEncapsulation} from '@angular/core';
import {MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {
  MatDatepicker,
  MatDatepickerActions,
  MatDatepickerApply,
  MatDatepickerCancel,
  MatDatepickerInput,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

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

}
