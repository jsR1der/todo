import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {InputComponent} from "../../components/input/input.component";
import {InputConfig, InputConfigBuilder} from "../../components/input/input.model";
import {AuthService} from "./auth.service";
import {AuthHttpService} from "./auth-http.service";
import {LoginPayload, SignUpPayload} from "./auth.model";
import {ButtonComponent} from "../../components/button/button.component";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterLink,
    MatTabGroup,
    MatTab,
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  public emailInputConfig: InputConfig<string>;
  public passwordInputConfig: InputConfig<string>;

  constructor(public authService: AuthService, private authHttp: AuthHttpService, private router: Router) {
  }

  ngOnInit() {
    this.emailInputConfig = new InputConfigBuilder<string>().setControl(this.authService.controls.name).addPlaceholder("Enter email...");
    this.passwordInputConfig = new InputConfigBuilder<string>().setControl(this.authService.controls.pass).addPlaceholder("Enter password...").setType('password')
  }

  public signIn(): void {
    if (this.authService.form.valid) {
      this.authHttp.signIn(this.authService.form.value as LoginPayload).subscribe(() => {
        this.router.navigate(["/"]).then()
      })
    }
    //   redirect to main page
  }

  public signUp(): void {
    if (this.authService.form.valid) {
      this.authHttp.signUp(this.authService.form.value as SignUpPayload).subscribe(() => {
        this.router.navigate(["/"]).then();
      })
    }
    //   redirect to main page
  }

  public signOut(): void {
    this.authHttp.signOut().subscribe(() => console.log(`user was logged out`))
    //   redirect to login screen´
  }


  public onTabChange(): void {
    this.authService.form.reset();
  }


}
