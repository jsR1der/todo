import {Component, Input, OnInit} from '@angular/core';
import {NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet} from "@angular/common";
import {TailwindFontSizeEnum, TitleType} from "../../models/tailwind.model";
import {ITitleConfig} from "./title.model";

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault
  ],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent implements OnInit {
  public fontSize: string;
  @Input({required: true}) config: ITitleConfig;

  ngOnInit() {
    this.getHeaderTailwindFontClass()
  }

  private getHeaderTailwindFontClass(): void {
    if (this.config.size) {
      this.fontSize = `text-${TailwindFontSizeEnum[this.config.size]}`;
    }
  }
}
