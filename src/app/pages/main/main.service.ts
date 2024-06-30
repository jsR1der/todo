import {Injectable} from '@angular/core';
import {ButtonConfig, ButtonConfigBuilder, ButtonDirector} from "../../components/button/button.model";

@Injectable()
export class MainService {

  constructor() {
  }

  public buildButtonConfig(data: ButtonConfig): ButtonConfig {
    const director = new ButtonDirector();
    const builder = new ButtonConfigBuilder()
    return director.buildConfig(builder, data)
  }
}
