import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TagComponent} from "../tag/tag.component";
import {NgTemplateOutlet} from "@angular/common";
import {InputComponent} from "../input/input.component";
import {TagsService} from "./tags.service";
import {InputConfig, InputConfigBuilder} from "../input/input.model";
import {catchError, filter, finalize, merge, of, Subject, takeUntil} from "rxjs";
import {TodoHttpService} from "../../services/todo/todo-http.service";
import {TodoItem} from "../../services/todo/todo.model";
import {TodoService} from "../todo/todo.service";

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
export class TagsComponent implements OnInit, OnDestroy {
  @Input({required: true}) todo: TodoItem;
  public inputConfig: InputConfig<string>;

  public unsubAll$ = new Subject<void>()

  constructor(
    public tagsService: TagsService,
    public todoService: TodoService,
    public todoHttpService: TodoHttpService) {
  }

  ngOnInit() {
    this.inputConfig = new InputConfigBuilder<string>().setControl(this.tagsService.tagControl).addEvents(['keydown', 'focusout']).addPlaceholder("New tag").setMaterial(false)
  }


  private pushNewTag(tagName: string): void {
    this.todoService.isLoading.next(true)
    this.todoHttpService.updateTodo({
      ...this.todo,
      tags: this.todo.tags.length ? [...this.todo.tags, tagName] : [tagName]
    }).pipe(finalize(() => this.todoService.isLoading.next(false)), catchError(e => {
      this.todoService.isLoading.next(false);
      //   show snackbar
      return of(e)
    })).subscribe(() => {
      this.todo.tags.push(tagName)
    })
  }

  ngOnDestroy() {
    this.unsubAll$.next();
    this.unsubAll$.complete()
  }

  public onInputInit() {
    // todo prevent copypaste
    const {keydown, focusout} = this.inputConfig.outputEvents;
    merge(keydown, focusout).pipe(takeUntil(this.unsubAll$), filter(Boolean)).subscribe(e => this.tagsService.handleInputEvents(e, this.pushNewTag.bind(this)))
  }
}
