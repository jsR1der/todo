import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {TagsComponent} from "../tags/tags.component";
import {InputComponent} from "../input/input.component";
import {TodoService} from "./todo.service";
import {MatCheckbox} from "@angular/material/checkbox";
import {InputConfig, InputConfigBuilder} from "../input/input.model";
import {TodoItem} from "../../services/todo/todo.model";
import {TodoHttpService} from "../../services/todo/todo-http.service";
import {catchError, debounceTime, finalize, merge, of, Subject, takeUntil} from "rxjs";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ReactiveFormsModule} from "@angular/forms";
import {UpdateTodoAdapter} from "./todo.model";

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    JsonPipe,
    DatepickerComponent,
    TagsComponent,
    InputComponent,
    MatCheckbox,
    NgIf,
    MatProgressSpinner,
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  providers: [TodoService]
})
export class TodoComponent implements OnInit, OnDestroy {
  @Input() todo: TodoItem = new TodoItem()

  private readonly unsubscribeAll$ = new Subject<void>()

  public descriptionInputConfig: InputConfig<string>;
  public nameInputConfig: InputConfig<string>;
  public tagsInputConfig: InputConfig<string[]>;
  public dateInputConfig: InputConfig<string>;

  constructor(public readonly todoService: TodoService,
              private readonly todoHttpService: TodoHttpService) {
  }

  ngOnInit() {
    this.todoService.controls.name.setValue(this.todo?.name || '');
    this.todoService.controls.tags.setValue(this.todo?.tags || []);
    this.todoService.controls.description.setValue(this.todo?.description || '');
    this.todoService.controls.date.setValue(this.todo?.date || '');
    this.nameInputConfig = new InputConfigBuilder<string>().setControl(this.todoService.controls.name).addPlaceholder("Enter name").setMaterial(false)
    this.descriptionInputConfig = new InputConfigBuilder<string>().setControl(this.todoService.controls.description).addPlaceholder("Enter description").setMaterial(false)
    this.tagsInputConfig = new InputConfigBuilder<string[]>().setControl(this.todoService.controls.tags).addEvents(['focusout', 'keydown']).addPlaceholder("Enter tag").setMaterial(false)
    this.dateInputConfig = new InputConfigBuilder<string>().setControl(this.todoService.controls.date).addPlaceholder("Enter date").setMaterial(false)


    this.todoService.form.valueChanges.pipe(takeUntil(this.unsubscribeAll$), debounceTime(750)).subscribe(update => {
      this.todoService.isLoading.next(true);
      this.todoHttpService.updateTodo(
        new UpdateTodoAdapter(this.todo, update as Partial<TodoItem>).output,
      ).pipe(
        catchError(e => {
          // show snackbar
          return of(e)
        }),
        finalize(() => this.todoService.isLoading.next(false))).subscribe(() => {
        this.todo = {...this.todo, ...update as Partial<TodoItem>}
      })
    })
  }


  public onTagsInputInit(): void {
    const {keydown, focusout} = this.tagsInputConfig.outputEvents;
    merge(keydown, focusout).pipe(takeUntil(this.unsubscribeAll$)).subscribe((e) => {
      this.todoService.handleInputEvents(e, this.tagsInputConfig.control, this.updateTags.bind(this))
    })
  }

  private updateTags(): void {
    window.document.body.click()
  }

  public onDateChange(isoString: string): void {
    this.todoService.controls.date.setValue(isoString)
  }


  ngOnDestroy() {
    this.unsubscribeAll$.next()
    this.unsubscribeAll$.complete()
  }

}
