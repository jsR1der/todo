import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TagComponent} from "../tag/tag.component";
import {NgTemplateOutlet} from "@angular/common";
import {InputComponent} from "../input/input.component";
import {TagsService} from "./tags.service";
import {InputConfig, InputConfigBuilder} from "../input/input.model";
import {merge, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [
    TagComponent,
    NgTemplateOutlet,
    InputComponent
  ],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input({required: true}) tags: string[];
  public inputConfig: InputConfig<string>;

  public unsubAll$ = new Subject<void>()

  constructor(
    public tagsService: TagsService) {
  }

  ngOnInit() {
    this.inputConfig = new InputConfigBuilder<string>(['keydown', 'focusout'], this.tagsService.tagControl, "New tag")
  }

  ngAfterViewInit() {
    const {keydown, focusout} = this.inputConfig.outputEvents;
    merge(keydown, focusout).pipe(takeUntil(this.unsubAll$)).subscribe(e => this.tagsService.handleInputEvents(e, this.pushNewTag.bind(this)))
  }

  private pushNewTag(tagName: string): void {
    this.tags.push(tagName)
  }

  ngOnDestroy() {
    this.unsubAll$.next();
    this.unsubAll$.complete()
  }
}
