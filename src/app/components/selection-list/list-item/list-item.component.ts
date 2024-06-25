import {Component, Input} from '@angular/core';
import {ListItem} from "../list.model";

@Component({
  selector: 'app-selection-list-item',
  standalone: true,
  imports: [],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent {
  @Input({required: true}) item: ListItem;

}
