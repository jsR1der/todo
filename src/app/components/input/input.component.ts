import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {InputConfig} from "./input.model";
import {Subject} from "rxjs";
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
export class InputComponent<T> implements AfterViewInit, OnDestroy {
  @ViewChild('input') inputRef: ElementRef<HTMLInputElement>;
  @Input({required: true}) config: InputConfig<T>;
  private readonly unsubscribeAll$ = new Subject<void>();

  constructor(private inputService: InputService) {
  }

  ngAfterViewInit(): void {
    this.inputService.input = this.inputRef.nativeElement;
    this.inputService.setInput(this.inputRef)
    this.inputService.setEvents(this.config.events);
  }

  ngOnDestroy() {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete()
  }

}
