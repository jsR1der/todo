import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LanguageService} from "./services/language/language.service";
import {DateTimeService} from "./services/date-time/date-time.service";
import {LoadingService} from "./interceptors/loading/loading.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatProgressSpinner, AsyncPipe, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [LanguageService, DateTimeService]
})
export class AppComponent implements OnInit {
  constructor(private languageService: LanguageService,
              private dateTime: DateTimeService,
              public loadingService: LoadingService,
  ) {
  }

  ngOnInit() {
    // console.log(this.languageService.getUserLanguage())
    // console.log(this.dateTime.getUserTimeZone())
  }
}
