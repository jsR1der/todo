import {Component, Input, OnInit} from '@angular/core';
import {TodoItem} from "../expansion-list/expansion-list.model";
import {JsonPipe} from "@angular/common";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {TagsComponent} from "../tags/tags.component";
import {InputComponent} from "../input/input.component";
import {TodoService} from "./todo.service";
import {InputService} from "../input/input.service";

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    JsonPipe,
    DatepickerComponent,
    TagsComponent,
    InputComponent
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  providers: [TodoService,InputService]
})
export class TodoComponent implements OnInit{
  @Input({required: true}) todo: TodoItem;

  constructor(public todoService: TodoService) {
  }
  ngOnInit() {
    this.todoService.setTodoDescriptionControl();
  }
}
