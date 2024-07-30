import {Component, Input} from '@angular/core';
import {GroupItemComponent} from "./group-item/group-item.component";
import {TodoGroup, TodoItem} from "../../services/todo/todo.model";
import {MainService} from "../../pages/main/main.service";
import {AllExpansionListStrategy, ExpansionListStrategy} from "../expansion-list/expansion-list.model";


@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [
    GroupItemComponent
  ],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent {
  constructor(private readonly mainService: MainService) {
  }

  @Input() groups: Record<string, TodoGroup>

  public setAllStrategy(items: TodoItem[]) {
    const strategy = new AllExpansionListStrategy('All')
    this.updateContext(strategy, items)
  }

  public setScheduledStrategy(items: TodoItem[]): void {
    const strategy = new AllExpansionListStrategy('Scheduled')
    this.updateContext(strategy, items)
  }

  public setTodayStrategy(items: TodoItem[]): void {
    const strategy = new AllExpansionListStrategy('Today')
    this.updateContext(strategy, items)
  }

  public setCompletedStrategy(items: TodoItem[]): void {
    const strategy = new AllExpansionListStrategy('Completed')
    this.updateContext(strategy, items)
  }



  private updateContext(strategy: ExpansionListStrategy, items: TodoItem[]): void {
    this.mainService.expansionListContext.setStrategy(strategy);
    this.mainService.selectedStrategy = strategy;
    this.mainService.expansionListContext.groupTodoItems(items);
  }
}
