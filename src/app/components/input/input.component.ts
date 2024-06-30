import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {InputConfig} from "./input.model";
import {InputService} from "./input.service";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: []
})
export class InputComponent<T> implements AfterViewInit {
  @ViewChild('input') inputRef: ElementRef<HTMLInputElement>;
  @Input({required: true}) config: InputConfig<T>;

  constructor(private inputService: InputService) {
  }

  ngAfterViewInit(): void {
    this.inputService.input = this.inputRef.nativeElement;
    this.inputService.setInput(this.inputRef)
    this.inputService.setEvents(this.config.events);
  }

}
