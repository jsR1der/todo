import {Component} from '@angular/core';
import {IGroupItem} from "./group-item/group-item.model";
import {GroupItemComponent} from "./group-item/group-item.component";

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
  public groups: IGroupItem[] = [
    {
      icon: '',
      iconColor: 'red',
      name: 'Test',
      containItems: 10
    },
    {
      icon: '',
      iconColor: 'red',
      name: 'Test',
      containItems: 10
    },
    {
      icon: '',
      iconColor: 'red',
      name: 'Test',
      containItems: 10
    },
    {
      icon: '',
      iconColor: 'red',
      name: 'Test',
      containItems: 10
    }
  ]
}
