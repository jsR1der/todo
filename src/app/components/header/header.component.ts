import {Component} from '@angular/core';
import {MatCard, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet} from "@angular/common";
import {TitleComponent} from "../title/title.component";

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
    NgSwitchDefault,
    TitleComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {

}
