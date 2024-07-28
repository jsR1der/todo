import {Component, Input, OnInit} from '@angular/core';
import {InputComponent} from "../input/input.component";
import {NgTemplateOutlet} from "@angular/common";
import {InputConfig, InputConfigBuilder} from "../input/input.model";
import {NonNullableFormBuilder} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatChipGrid} from "@angular/material/chips";

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [
    InputComponent,
    NgTemplateOutlet,
    MatFormField,
    MatChipGrid,
    MatLabel,

  ],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent implements OnInit {
  public isSelected = false;
  public tagInputConfig: InputConfig<string>
  @Input() tag: string;

  constructor(private readonly fb: NonNullableFormBuilder) {
  }

  ngOnInit() {
    this.tagInputConfig = new InputConfigBuilder<string>().setControl(this.fb.control<string>(this.tag)).addEvents(['focusout', 'keydown']).addPlaceholder("Enter tag").setMaterial(false)

  }

  public selectTag() {

  }



}
