import {Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {IToolbarAction} from "./toolbar.model";
import {MainService} from "../../pages/main/main.service";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  constructor(private mainService: MainService) {
  }

  public actions: IToolbarAction[] = [
    {
      action: this.mainService.openCreteListDialog.bind(this.mainService),
      iconName: 'add'
    },
    {
      action: this.mockAction,
      iconName: 'post_add'
    },
    {
      action: this.mockAction,
      iconName: 'ios_share'
    },
    {
      action: this.mainService.deleteList.bind(this.mainService),
      iconName: 'delete'
    },
  ]

  public mockAction(): void {
    console.log(`mock action`)
  }

}
