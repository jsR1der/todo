import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatIcon} from "@angular/material/icon";
import {TodoComponent} from "../todo/todo.component";
import {ExpansionListService} from "./expansion-list.service";
import {InputConfig, InputConfigBuilder} from "../input/input.model";
import {TodoHttpService} from "../../services/todo/todo-http.service";
import {InputComponent} from "../input/input.component";
import {debounceTime, Subject, takeUntil} from "rxjs";
import {TodoItem, TodoList} from "../../services/todo/todo.model";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {list} from "postcss";

@Component({
  selector: 'app-expansion-list',
  standalone: true,
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatIcon,
    TodoComponent,
    InputComponent,
    AsyncPipe,
    MatProgressSpinner,
    NgIf
  ],
  providers: [ExpansionListService],
  templateUrl: './expansion-list.component.html',
  styleUrl: './expansion-list.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ExpansionListComponent implements OnInit, OnDestroy {
  @Input() lists: TodoList[];
  public configs: InputConfig<string>[] = []
  public unsubscribeAll$ = new Subject<void>();

  constructor(public readonly expansionListService: ExpansionListService, private readonly todoHttpService: TodoHttpService) {
  }

  ngOnInit() {
    this.createConfigs();
  }

  private createConfigs(): void {
    this.configs = this.lists.map((list) => {
      this.expansionListService.control.setValue(list.name)
      return new InputConfigBuilder<string>().setControl(this.expansionListService.control).addEvents(['focusout']).addPlaceholder("Enter description").setMaterial(false)
    })
  }

  public onInputInit(index: number): void {
    const control = this.configs[index].control;
    this.configs[index].outputEvents['focusout'].pipe(takeUntil(this.unsubscribeAll$), debounceTime(750)).subscribe(() => {
      if (!control.value) {
        control.setValue(this.lists[index].name);
      } else {
        this.todoHttpService.updateTodoList({...this.lists[index], name: control.value}).subscribe(() => {
          this.lists[index] = {...this.lists[index], name: control.value}
        })
      }

    })
  }

  ngOnDestroy() {
    this.unsubscribeAll$.next()
    this.unsubscribeAll$.complete()
  }

  public addEmptyTodo(newTodo: TodoItem, index: number) {
    this.lists[index].items[this.lists[index].items.length-1] = newTodo;
  }

  public completeTodo(todoIndex: number,listIndex: number) {
    // refactor later
    this.lists[listIndex].items = this.lists[listIndex].items.filter((item,index) => index !== todoIndex);
  }
}
