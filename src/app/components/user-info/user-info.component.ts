import {Component} from '@angular/core';
import {UserImageComponent} from "./user-image/user-image.component";
import {UserNameComponent} from "./user-name/user-name.component";
import {TailwindFontSizeEnum, TitleType} from "../../models/tailwind.model";
import {TitleComponent} from "../title/title.component";
import {AuthHttpService} from "../../pages/auth/auth-http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    UserImageComponent,
    UserNameComponent,
    TitleComponent
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {

  protected readonly TitleType = TitleType;
  protected readonly TailwindFontSizeEnum = TailwindFontSizeEnum;

  constructor(private authHttpService: AuthHttpService, private router: Router) {
  }

  public logout(): void {
    this.authHttpService.signOut().subscribe(() => {
      this.authHttpService.clearAuthState();
      this.router.navigate(['auth']).then()
    })

  }

}
