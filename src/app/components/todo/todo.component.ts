import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {TagsComponent} from "../tags/tags.component";
import {InputComponent} from "../input/input.component";
import {TodoService} from "./todo.service";
import {MatCheckbox} from "@angular/material/checkbox";
import {InputConfig, InputConfigBuilder} from "../input/input.model";
import {TodoItem} from "../../services/todo/todo.model";
import {TodoHttpService} from "../../services/todo/todo-http.service";
import {catchError, debounceTime, finalize, of, Subject, takeUntil} from "rxjs";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ReactiveFormsModule} from "@angular/forms";
import {UpdateTodoAdapter} from "./todo.model";
import {MatAccordion, MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";

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
    ReactiveFormsModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  providers: [TodoService]
})
export class TodoComponent implements OnInit, OnDestroy {
  @Input() listId: number;
  @Input() todo: TodoItem = new TodoItem()
  @Output() onCreate = new EventEmitter<TodoItem>()
  @Output() onComplete = new EventEmitter<void>()

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
    if (!this.todo.id) {
      this.todoService.controls.iscompleted.disable({emitEvent: false})
    }
    this.nameInputConfig = new InputConfigBuilder<string>().setControl(this.todoService.controls.name).addPlaceholder("Enter name").setMaterial(false)
    this.descriptionInputConfig = new InputConfigBuilder<string>().setControl(this.todoService.controls.description).addPlaceholder("Enter description").setMaterial(false)
    this.tagsInputConfig = new InputConfigBuilder<string[]>().setControl(this.todoService.controls.tags).addPlaceholder("Enter tag").setMaterial(false)
    this.dateInputConfig = new InputConfigBuilder<string>().setControl(this.todoService.controls.date).addPlaceholder("Enter date").setMaterial(false)


    this.todoService.form.valueChanges.pipe(takeUntil(this.unsubscribeAll$), debounceTime(750)).subscribe(update => {
      this.todoService.isLoading.next(true);
      if (this.todo.id) {
        this.todoHttpService.updateTodo(
          new UpdateTodoAdapter(this.todo, update as Partial<TodoItem>).output,
        ).pipe(
          catchError(e => {
            // show snackbar
            return of(e)
          }),
          finalize(() => this.todoService.isLoading.next(false))).subscribe(() => {
          this.todo = {...this.todo, ...update as Partial<TodoItem>}
          if (this.todo.iscompleted) {
            this.onComplete.emit();
          }
        })
      } else {
        this.todoHttpService.createTodo(new UpdateTodoAdapter({
          ...this.todo,
          list_id: this.listId
        }, update as Partial<TodoItem>).output).pipe(catchError(e => {
          return of(e)
        }), finalize(() => {
          this.todoService.isLoading.next(false)
        })).subscribe((newTodo) => {
          this.onCreate.next(newTodo);
          this.todo = new TodoItem();
          this.todoService.form.reset({name: ''}, {emitEvent: false})
        })
      }
    })
  }

  public onDateChange(isoString: string): void {
    this.todoService.controls.date.setValue(isoString)
  }


  ngOnDestroy() {
    this.unsubscribeAll$.next()
    this.unsubscribeAll$.complete()
  }

}
