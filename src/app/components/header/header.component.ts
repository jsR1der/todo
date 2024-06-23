import {Component, Input, OnInit} from '@angular/core';
import {MatCard, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {IHeaderConfig} from "./header.model";
import {NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet} from "@angular/common";
import {TailwindFontSizeEnum} from "../../models/tailwind.model";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    NgSwitch,
    NgSwitchCase,
    NgTemplateOutlet,
    NgSwitchDefault
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit {
  @Input({required: true}) config: IHeaderConfig
  public fontSize: string;

  ngOnInit() {
    this.getHeaderTailwindFontClass()
  }

  private getHeaderTailwindFontClass(): void {
    if (this.config.fontSize) {
      this.fontSize = `text-${TailwindFontSizeEnum[this.config.fontSize]}`;
    }
  }
}
