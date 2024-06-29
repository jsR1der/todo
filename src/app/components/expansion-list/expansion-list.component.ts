import {Component} from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatIcon} from "@angular/material/icon";
import {ExpansionList} from "./expansion-list.model";
import {TodoComponent} from "../todo/todo.component";

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
    TodoComponent
  ],
  templateUrl: './expansion-list.component.html',
  styleUrl: './expansion-list.component.scss'
})
export class ExpansionListComponent {
  public items: ExpansionList[] = [{
    name: 'First',
    todoList: [
      {
        isCompleted: false,
        title: 'UndoneTask',
        description: 'Description here',
        tags: ['tag1', 'tag2', 'tag3'],
        date: new Date().toISOString(),
      },
      {
        isCompleted: true,
        title: 'DoneTask',
        description: 'Description here',
        tags: ['tag1', 'tag2', 'tag3'],
        date: new Date().toISOString(),
      }
    ]
  }]

}
