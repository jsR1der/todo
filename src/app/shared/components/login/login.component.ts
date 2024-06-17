import { Component } from '@angular/core';
import {Params, Router, RouterLink} from "@angular/router";
import {routes} from "../../../app.routes";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(public router: Router) {
  }
  public params: Params = {}

}
