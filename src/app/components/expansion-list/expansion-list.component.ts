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
import {InputComponent} from "../input/input.component";
import {Subject} from "rxjs";
import {TodoItem, TodoList} from "../../services/todo/todo.model";
import {AsyncPipe, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MainService} from "../../pages/main/main.service";
import {NonNullableFormBuilder, Validators} from "@angular/forms";
import {AllExpansionListStrategy, SingleListExpansionListStrategy} from "./expansion-list.model";

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
    NgIf,
    NgSwitchCase,
    NgSwitch
  ],
  providers: [ExpansionListService],
  templateUrl: './expansion-list.component.html',
  styleUrl: './expansion-list.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ExpansionListComponent implements OnInit, OnDestroy {
  public config: InputConfig<string>;
  public unsubscribeAll$ = new Subject<void>();

  constructor(public mainService: MainService, private fb: NonNullableFormBuilder) {
  }


  ngOnInit() {
    this.createConfig();
  }

  private createConfig(): void {
    this.config = this.configureConfig(this.mainService.selectedList);
  }

  private configureConfig(list: TodoList): InputConfig<string> {
    return new InputConfigBuilder<string>().setControl(this.fb.control(list.name, Validators.required)).addEvents(['focusout']).addPlaceholder("Enter description").setMaterial(false)
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
    this.mainService.selectedList.count++
  }

  public completeTodo(todoIndex: number) {
    // refactor later
    this.mainService.selectedList.items = this.mainService.selectedList.items.filter((item, index) => index !== todoIndex);
  }
  protected readonly SingleListExpansionListStrategy = SingleListExpansionListStrategy;
  protected readonly AllExpansionListStrategy = AllExpansionListStrategy;
}
