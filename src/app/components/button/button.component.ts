import {Component, Input, OnInit} from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {ButtonConfig} from "./button.model";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent{
  @Input({required: true}) config: ButtonConfig;
}
