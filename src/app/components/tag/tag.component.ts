import {Component, Input} from '@angular/core';
import {InputConfig, InputConfigBuilder} from "../input/input.model";
import {NonNullableFormBuilder} from "@angular/forms";
import {InputComponent} from "../input/input.component";
import {filter, merge, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [
    InputComponent
  ],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent {
  public readonly tagPrefix = '#';
  @Input({required: true}) tag: string;
  public unsubAll$: Subject<string>;
  public tagInputConfig: InputConfig<string>;

  constructor(private fb: NonNullableFormBuilder) {
  }

  public selectTag(tag: string) {
    this.tagInputConfig = new InputConfigBuilder<string>().setControl(this.fb.control(tag)).addEvents(['keydown', 'focusout']).addPlaceholder("New tag").setMaterial(false)
  }

  public onInputInit() {
    const {keydown, focusout} = this.tagInputConfig.outputEvents;
    merge(keydown, focusout).pipe(takeUntil(this.unsubAll$), filter(Boolean)).subscribe(e => null)
  }
}
