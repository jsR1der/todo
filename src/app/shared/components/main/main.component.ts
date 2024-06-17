import { Component } from '@angular/core';
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {MatButton} from "@angular/material/button";
import {UserInfoComponent} from "../user-info/user-info.component";
import {GroupsComponent} from "../groups/groups.component";
import {ListComponent} from "../list/list.component";
import {ButtonComponent} from "../button/button.component";
import {HeaderComponent} from "../header/header.component";

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
    ButtonComponent,
    HeaderComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  public showFiller = true;
}
