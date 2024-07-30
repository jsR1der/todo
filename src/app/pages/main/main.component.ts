import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {MatButton} from "@angular/material/button";
import {UserInfoComponent} from "../../components/user-info/user-info.component";
import {GroupsComponent} from "../../components/groups/groups.component";
import {ListComponent} from "../../components/selection-list/list.component";
import {IconButtonComponent} from "../../components/icon-button/icon-button.component";
import {HeaderComponent} from "../../components/header/header.component";
import {ExpansionListComponent} from "../../components/expansion-list/expansion-list.component";
import {TailwindFontSizeEnum, TitleType} from "../../models/tailwind.model";
import {TitleComponent} from "../../components/title/title.component";
import {MainService} from "./main.service";
import {ActivatedRoute} from "@angular/router";
import {TodoGroup, TodoList} from "../../services/todo/todo.model";
import {MatDialog} from "@angular/material/dialog";
import {TodoHttpService} from "../../services/todo/todo-http.service";
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";
import {
  ExpansionListContext,
  SingleListExpansionListStrategy
} from "../../components/expansion-list/expansion-list.model";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatDrawerContainer,
    MatButton,
    MatDrawer,
    UserInfoComponent,
    GroupsComponent,
    ListComponent,
    IconButtonComponent,
    HeaderComponent,
    ExpansionListComponent,
    TitleComponent,
    ToolbarComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements OnInit {
  public lists: TodoList[] = []
  public groups: Record<string, TodoGroup>;
  protected readonly TailwindFontSizeEnum = TailwindFontSizeEnum;
  protected readonly HeaderType = TitleType;

  constructor(public mainService: MainService, private aRoute: ActivatedRoute, private matDialog: MatDialog, private readonly todoHttpService: TodoHttpService) {
  }

  ngOnInit() {
    this.lists = this.getLists()
    this.groups = this.getGroups()

    if (this.lists?.length) {
      this.mainService.selectList(this.lists[0]);
      const strategy = new SingleListExpansionListStrategy(this.mainService.selectedList.name)
      this.mainService.expansionListContext = new ExpansionListContext(this.mainService.lists)
      this.mainService.expansionListContext.setStrategy(strategy)
      this.mainService.expansionListContext.groupTodoItems(this.mainService.selectedList.items)
      this.mainService.selectedStrategy = strategy;
      console.log(this.mainService.expansionListContext.groups)
      console.log(this.mainService.selectedStrategy)
    } else {
      this.mainService.selectList(new TodoList())
      this.mainService.expansionListContext = new ExpansionListContext(this.mainService.lists)
      const strategy = new SingleListExpansionListStrategy(this.mainService.selectedList.name)
      this.mainService.expansionListContext.setStrategy(strategy)
      this.mainService.selectedStrategy = strategy;
      console.log(this.mainService.expansionListContext.groups)
      console.log(this.mainService.selectedStrategy)
    }

    this.mainService.onListCreate.subscribe(newList => {
      this.lists.push(newList)
      this.mainService.selectList(newList)
    })

    this.mainService.onListDelete.subscribe(deletedId => {
      this.lists = this.lists.filter((item) => item.id !== deletedId);
      if (this.lists.length) {
        this.mainService.selectList(this.lists[this.lists.length - 1]);
      } else {
        this.mainService.selectList(new TodoList())
      }
    })
  }


  private getLists(): TodoList[] {
    const lists = this.aRoute.snapshot.data['data'].lists;
    this.mainService.lists = lists;
    if (!lists) {
      return [];
    }
    return lists;
  }


  private getGroups() {
    const lists = this.aRoute.snapshot.data['data'].groups;
    if (!lists) {
      return [];
    }
    return lists;
  }
}
