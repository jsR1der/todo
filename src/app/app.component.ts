import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LanguageService} from "./services/language.service";
import {DateTimeService} from "./services/date-time.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [LanguageService, DateTimeService]
})
export class AppComponent implements OnInit {
  constructor(private languageService: LanguageService,
              private dateTime: DateTimeService) {
  }

  ngOnInit() {
    console.log(this.languageService.getUserLanguage())
    console.log(this.dateTime.getUserTimeZone())
  }
}
