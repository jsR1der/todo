import {Component, Input} from '@angular/core';
import {TodoItem} from "../expansion-list/expansion-list.model";
import {JsonPipe} from "@angular/common";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {TagsComponent} from "../tags/tags.component";

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    JsonPipe,
    DatepickerComponent,
    TagsComponent
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  @Input({required: true}) todo: TodoItem;
}
