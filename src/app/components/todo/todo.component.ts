import {Component, Input, OnInit} from '@angular/core';
import {TodoItem} from "../expansion-list/expansion-list.model";
import {JsonPipe, NgIf} from "@angular/common";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {TagsComponent} from "../tags/tags.component";
import {InputComponent} from "../input/input.component";
import {TodoService} from "./todo.service";
import {MatCheckbox} from "@angular/material/checkbox";
import {InputConfig, InputConfigBuilder} from "../input/input.model";

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    JsonPipe,
    DatepickerComponent,
    TagsComponent,
    InputComponent,
    MatCheckbox,
    NgIf
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  @Input() todo: TodoItem;
  public inputConfig: InputConfig<string>

  constructor(public todoService: TodoService) {
  }

  ngOnInit() {
    this.todoService.setTodoDescriptionControl(this.todo?.description);
    this.inputConfig = new InputConfigBuilder<string>().setControl(this.todoService.todoDescriptionControl).addEvents(['focusout']).addPlaceholder("Enter description")
  }

  public onConfiguration(): void {
    this.inputConfig.outputEvents['focusout'].subscribe()
  }

}
