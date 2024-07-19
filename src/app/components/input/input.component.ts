import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
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
  providers: [InputService]
})
export class InputComponent<T> implements AfterViewInit {
  @ViewChild('input') inputRef: ElementRef<HTMLInputElement>;
  @Input({required: true}) config: InputConfig<T>;
  @Output() afterConfiguration = new EventEmitter<void>();

  constructor(private inputService: InputService) {
  }


  ngAfterViewInit(): void {
    this.inputService.setInputRef(this.inputRef, this.config)
    this.inputService.setEvents(this.config);
    this.afterConfiguration.emit()
  }
}
