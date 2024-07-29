import {Component, Input} from '@angular/core';
import {TodoList} from "../../../services/todo/todo.model";

@Component({
  selector: 'app-selection-list-item',
  standalone: true,
  imports: [],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent {
  @Input({required: true}) item: TodoList;


}
