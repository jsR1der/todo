import {Component} from '@angular/core';
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {MatButton} from "@angular/material/button";
import {UserInfoComponent} from "../../components/user-info/user-info.component";
import {GroupsComponent} from "../../components/groups/groups.component";
import {ListComponent} from "../../components/selection-list/list.component";
import {ButtonComponent} from "../../components/button/button.component";
import {HeaderComponent} from "../../components/header/header.component";
import {DetailedListComponent} from "../../components/detailed-list/detailed-list.component";
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";
import {TitleType, TailwindFontSizeEnum} from "../../models/tailwind.model";
import {TitleComponent} from "../../components/title/title.component";

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
    HeaderComponent,
    DetailedListComponent,
    ToolbarComponent,
    TitleComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  protected readonly TailwindFontSizeEnum = TailwindFontSizeEnum;
  protected readonly HeaderType = TitleType;

  //todo replace later
  public action(): void {
    console.log(`action`)
  }

}
