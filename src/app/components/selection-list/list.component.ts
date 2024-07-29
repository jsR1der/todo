import {Component, Input} from '@angular/core';
import {ListItemComponent} from "./list-item/list-item.component";
import {TodoList} from "../../services/todo/todo.model";
import {MainService} from "../../pages/main/main.service";

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
  @Input() lists: TodoList[];
  constructor(public mainService: MainService) {
  }
}
