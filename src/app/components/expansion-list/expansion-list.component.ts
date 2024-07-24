import {Component, Input, ViewEncapsulation} from '@angular/core';
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
  styleUrl: './expansion-list.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ExpansionListComponent {
  @Input() lists: ExpansionList[];

}
