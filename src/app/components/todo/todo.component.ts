import {Component, Input, OnInit} from '@angular/core';
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {TagsComponent} from "../tags/tags.component";
import {InputComponent} from "../input/input.component";
import {TodoService} from "./todo.service";
import {MatCheckbox, MatCheckboxChange} from "@angular/material/checkbox";
import {InputConfig, InputConfigBuilder} from "../input/input.model";
import {TodoItem} from "../../services/todo/todo.model";
import {TodoHttpService} from "../../services/todo/todo-http.service";
import {finalize} from "rxjs";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    JsonPipe,
    DatepickerComponent,
    TagsComponent,
    InputComponent,
    MatCheckbox,
    NgIf,
    MatProgressSpinner,
    AsyncPipe
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  @Input() todo: TodoItem = {} as TodoItem;
  public inputConfig: InputConfig<string>

  constructor(public todoService: TodoService,
              private readonly todoHttpService: TodoHttpService) {
  }

  ngOnInit() {
    this.todoService.setTodoDescriptionControl(this.todo?.description);
    this.inputConfig = new InputConfigBuilder<string>().setControl(this.todoService.todoDescriptionControl).addEvents(['focusout']).addPlaceholder("Enter description").setMaterial(false)
  }

  public onInputInit(): void {
    this.inputConfig.outputEvents['focusout'].subscribe()
  }

  public onCheckboxChange(change: MatCheckboxChange): void {
    this.todoService.isLoading.next(true);
    this.todoHttpService.updateTodo({
      ...this.todo,
      iscompleted: change.checked
    }).pipe(
      finalize(() => this.todoService.isLoading.next(false))).subscribe(() => {
      this.todo.iscompleted = change.checked;
    })

  }

  public cancelClickOnLoading($event: MouseEvent) {
    $event.stopImmediatePropagation();
  }
}
