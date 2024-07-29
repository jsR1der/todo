import {Injectable} from '@angular/core';
import {ButtonConfig, ButtonConfigBuilder, ButtonDirector} from "../../components/icon-button/button.model";
import {Subject} from "rxjs";
import {TodoList} from "../../services/todo/todo.model";

@Injectable()
export class MainService {
  public onListCreate = new Subject<TodoList>();

  constructor() {
  }

  public buildButtonConfig(data: ButtonConfig): ButtonConfig {
    const director = new ButtonDirector();
    const builder = new ButtonConfigBuilder()
    return director.buildConfig(builder, data)
  }
}
