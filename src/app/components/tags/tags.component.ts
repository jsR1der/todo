import {AfterViewInit, Component, Input} from '@angular/core';
import {TagComponent} from "../tag/tag.component";
import {NgTemplateOutlet} from "@angular/common";
import {InputComponent} from "../input/input.component";
import {InputService} from "../input/input.service";
import {TagsService} from "./tags.service";

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
  providers: [InputService]
})
export class TagsComponent implements AfterViewInit {
  @Input({required: true}) tags: string[];

  constructor(
    public tagsService: TagsService,
    private inputService: InputService) {
  }


  ngAfterViewInit() {
    this.inputService.events$['keydown'].pipe().subscribe((event: Event) => {
      this.tagsService.keyboardEventHandler(event, this.pushNewTag.bind(this));
    })
  }

  private pushNewTag(tagName: string): void {
    this.tags.push(tagName);
  }
}
