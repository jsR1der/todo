import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {MatButton} from "@angular/material/button";
import {UserInfoComponent} from "../../components/user-info/user-info.component";
import {GroupsComponent} from "../../components/groups/groups.component";
import {ListComponent} from "../../components/selection-list/list.component";
import {ButtonComponent} from "../../components/button/button.component";
import {HeaderComponent} from "../../components/header/header.component";
import {ExpansionListComponent} from "../../components/expansion-list/expansion-list.component";
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";
import {TailwindFontSizeEnum, TitleType} from "../../models/tailwind.model";
import {TitleComponent} from "../../components/title/title.component";
import {MainService} from "./main.service";
import {ButtonConfig} from "../../components/button/button.model";

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
    ExpansionListComponent,
    ToolbarComponent,
    TitleComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [MainService]
})
export class MainComponent implements OnInit {
  public headerButtonConfig: ButtonConfig;
  protected readonly TailwindFontSizeEnum = TailwindFontSizeEnum;
  protected readonly HeaderType = TitleType;

  constructor(private mainService: MainService) {
  }

  public action(): void {
    console.log(`click`)
  }

  ngOnInit() {
    this.headerButtonConfig = this.mainService.buildButtonConfig({
      iconName: 'add',
      color: 'primary',
      action: this.action.bind(this)
    })
  }


}
