import {Component, inject, Input} from "@angular/core";
import {TodoItem} from "../../services/todo/todo.model";
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {TodoHttpService} from "../../services/todo/todo-http.service";
import {TodoService} from "../todo/todo.service";

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatChipsModule,
    MatIcon,
  ],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent {
  @Input() todo: TodoItem;
  public addOnBlur = true;
  public announcer = inject(LiveAnnouncer);
  public readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(private readonly todoHttpService: TodoHttpService, private readonly todoService: TodoService) {
  }


  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.todo.tags.push(value);
    }


    event.chipInput!.clear();
  }

  public remove(tag: string): void {
    const index = this.todo.tags.indexOf(tag);

    if (index >= 0) {
      this.todo.tags.splice(index, 1);

      this.announcer.announce(`Removed ${tag}`);
    }
  }

  public edit(fruit: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      this.updateTags()
      return;
    }

    // Edit existing fruit
    const index = this.todo.tags.indexOf(fruit);
    if (index >= 0) {
      this.todo.tags[index] = value;
    }
    this.updateTags()
  }

  public updateTags() {
    if (this.todo.id) {
      this.todoService.controls.tags.setValue(this.todo.tags);
      //   this.todoService.isLoading.next(true);
      //   this.todoHttpService.updateTodo(
      //     new UpdateTodoAdapter(this.todo, {} as Partial<TodoItem>).output,
      //   ).pipe(
      //     catchError(e => {
      //       // show snackbar
      //       return of(e)
      //     }),
      //     finalize(() => this.todoService.isLoading.next(false))).subscribe(() => {
      //     console.log(`tags has been updated`)
      //   })
    }
  }

}
