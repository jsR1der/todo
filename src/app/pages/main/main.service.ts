import {Injectable} from '@angular/core';
import {ButtonConfig, ButtonConfigBuilder, ButtonDirector} from "../../components/icon-button/button.model";
import {filter, Subject} from "rxjs";
import {TodoList} from "../../services/todo/todo.model";
import {CreateListDialogComponent} from "../../dialogs/create-list-dialog/create-list-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {TodoHttpService} from "../../services/todo/todo-http.service";
import {ExpansionListContext, ExpansionListStrategy} from "../../components/expansion-list/expansion-list.model";

@Injectable({providedIn: "root"})
export class MainService {
  public onListCreate = new Subject<TodoList>();
  public onListDelete = new Subject<number>();

  public lists: TodoList[] = [];
  public selectedList: TodoList;

  public expansionListContext: ExpansionListContext;
  public selectedStrategy: ExpansionListStrategy;


  constructor(private matDialog: MatDialog, private todoHttpService: TodoHttpService) {
  }

  public buildButtonConfig(data: ButtonConfig): ButtonConfig {
    const director = new ButtonDirector();
    const builder = new ButtonConfigBuilder()
    return director.buildConfig(builder, data)
  }

  public selectList(list: TodoList): void {
    this.selectedList = list;
  }

  public openCreteListDialog(): void {
    this.matDialog.open(CreateListDialogComponent, {
      width: '550px',
      data: {}
    }).afterClosed().pipe(filter(Boolean)).subscribe(newList => {
      this.todoHttpService.createTodoList(newList).subscribe(newTodoList => {
        this.onListCreate.next(newTodoList);
      })
    })
  }

  public deleteList(): void {
    this.todoHttpService.deleteTodoList(this.selectedList.id).subscribe(() => {
      this.onListDelete.next(this.selectedList.id);
    })
  }
}
