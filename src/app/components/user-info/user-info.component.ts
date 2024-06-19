import { Component } from '@angular/core';
import {UserImageComponent} from "./user-image/user-image.component";
import {UserNameComponent} from "./user-name/user-name.component";

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    UserImageComponent,
    UserNameComponent
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {

}
