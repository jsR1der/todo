import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {TodoGroup} from "../../../services/todo/todo.model";
import {GroupItemMeta} from "./group-item.model";

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
  @Input({required: true}) group: TodoGroup;
  @Input() config: GroupItemMeta;
}
