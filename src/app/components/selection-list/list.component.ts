import {Component, Input} from '@angular/core';
import {ListItem} from "./list.model";
import {ListItemComponent} from "./list-item/list-item.component";

@Component({
  selector: 'app-selection-list',
  standalone: true,
  imports: [
    ListItemComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public items: ListItem[] = [
    {
      name: 'first',
      itemsCount: 20
    },
    {
      name: 'second',
      itemsCount: 40
    }
  ]
}
