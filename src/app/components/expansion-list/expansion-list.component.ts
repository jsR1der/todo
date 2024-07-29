import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
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
import {MainService} from "../../pages/main/main.service";
import {NonNullableFormBuilder, Validators} from "@angular/forms";

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
  public config: InputConfig<string>;
  public unsubscribeAll$ = new Subject<void>();

  constructor(public readonly expansionListService: ExpansionListService, private readonly todoHttpService: TodoHttpService, public mainService: MainService, private fb: NonNullableFormBuilder) {
  }


  ngOnInit() {
    this.createConfig();
    // this.mainService.onListCreate.pipe(takeUntil(this.unsubscribeAll$)).subscribe(newTodoList => {
    //   this.config.push(this.configureConfig(newTodoList))
    // })
  }

  private createConfig(): void {
    this.config = this.configureConfig(this.mainService.selectedList);
  }

  private configureConfig(list: TodoList): InputConfig<string> {
    return new InputConfigBuilder<string>().setControl(this.fb.control(list.name, Validators.required)).addEvents(['focusout']).addPlaceholder("Enter description").setMaterial(false)
  }


  public onInputInit(): void {
    const control = this.config.control;
    this.config.outputEvents['focusout'].pipe(takeUntil(this.unsubscribeAll$), debounceTime(750)).subscribe(() => {
      if (!control.value) {
        control.setValue(this.mainService.selectedList.name);
      } else {
        if (control.valid) {

          this.todoHttpService.updateTodoList({...this.mainService.selectedList, name: control.value}).subscribe(() => {
            this.mainService.selectedList = {...this.mainService.selectedList, name: control.value}
          })
        } else {
          console.log('please validate input')
        }
      }

    })
  }

  ngOnDestroy() {
    this.unsubscribeAll$.next()
    this.unsubscribeAll$.complete()
  }

  public addEmptyTodo(newTodo: TodoItem) {
    if (this.mainService.selectedList.items.length) {

      this.mainService.selectedList.items[this.mainService.selectedList.items.length - 1] = newTodo;
    } else {
      this.mainService.selectedList.items = [newTodo]
    }
  }

  public completeTodo(todoIndex: number) {
    // refactor later
    this.mainService.selectedList.items = this.mainService.selectedList.items.filter((item, index) => index !== todoIndex);
  }

}
