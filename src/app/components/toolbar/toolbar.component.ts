import {Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {IToolbarAction} from "./toolbar.model";

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
  public actions: IToolbarAction[] = [
    {
      action: this.mockAction,
      iconName: 'post_add'
    },
    {
      action: this.mockAction,
      iconName: 'add'
    },
    {
      action: this.mockAction,
      iconName: 'ios_share'
    },
  ]

  public mockAction(): void {
    console.log(`mock action`)
  }

}
