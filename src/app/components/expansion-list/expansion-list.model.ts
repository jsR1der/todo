import {TodoItem, TodoList} from "../../services/todo/todo.model";


export interface ExpansionListStrategy {
  title: string;
  lists: TodoList[];

  groupTodoItems(todoItems: TodoItem[] | TodoList): ExpansionTodoGroup[];
}

export class ExpansionListContext {
  public groups: ExpansionTodoGroup[] = [];
  private strategy: ExpansionListStrategy;

  constructor(public lists: TodoList[]) {
  }

  public setStrategy(strategy: ExpansionListStrategy): void {
    this.strategy = strategy;
    this.strategy.lists = this.lists;
  }

  public groupTodoItems(todoItems: TodoItem[]): void {
    if (this.strategy) {
      this.groups = this.strategy.groupTodoItems(todoItems)
    } else {
      //   put snackbar here
      console.log('No strategy provided')
    }
  }
}


export class AllExpansionListStrategy implements ExpansionListStrategy {
  public lists: TodoList[];

  constructor(public title: string) {
  }


  public groupTodoItems(todoItems: TodoItem[]): ExpansionTodoGroup[] {
    return this.lists.map(list => ({
      listName: list.name,
      items: todoItems.filter(todo => todo.list_id === list.id)
    }))
  }
}

export class SingleListExpansionListStrategy implements ExpansionListStrategy {
  public lists: TodoList[];

  constructor(public title: string) {
  }

  public groupTodoItems(todoItems: TodoItem[]): ExpansionTodoGroup[] {
    return [{listName: null, items: todoItems}];
  }
}

export class ScheduledExpansionListStrategy implements ExpansionListStrategy {
  public lists: TodoList[];

  constructor(public title: string) {
  }

  public groupTodoItems(todoItems: TodoItem[]): ExpansionTodoGroup[] {
    return this.groupByDate(todoItems);
  }

  private groupByDate(items: TodoItem[]): ExpansionTodoGroup[] {
    let today = new Date().toISOString();
    today = today.slice(0, today.indexOf('T'));
    const outdated: TodoItem[] = [];
    const recent: TodoItem[] = [];
    items.forEach(item => {
      if (item.date && today > item.date) {
        outdated.push(item)
      } else {
        recent.push(item)
      }
    })
    return [{listName: 'Past Due', items: outdated}, {listName: 'Recent', items: recent}];
  }
}

export class TodayExpansionListStrategy implements ExpansionListStrategy {
  public lists: TodoList[];

  constructor(public title: string) {
  }

  public groupTodoItems(todoItems: TodoItem[]): ExpansionTodoGroup[] {
    return [{listName: null, items: todoItems}];
  }
}

export class CompletedExpansionListStrategy implements ExpansionListStrategy {
  public lists: TodoList[];

  constructor(public title: string) {
  }

  public groupTodoItems(todoItems: TodoItem[]): ExpansionTodoGroup[] {
    console.log(todoItems)
    return [];
  }
}

export interface ExpansionTodoGroup {
  listName: string | null;
  items: TodoItem[]
}
