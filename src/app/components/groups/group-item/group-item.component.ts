import {Component, Input} from '@angular/core';
import {IGroupItem} from "./group-item.model";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-group-item',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatIcon
  ],
  templateUrl: './group-item.component.html',
  styleUrl: './group-item.component.scss'
})
export class GroupItemComponent {
 @Input({required: true}) group: IGroupItem;
}
