interface BaseButtonConfig<TReturn> {
  iconName: string;
  color: string;
  action: ButtonConfigAction<TReturn>
}

type ButtonConfigAction<TReturn> = () => TReturn;

export class ButtonConfig implements BaseButtonConfig<void> {
  iconName: string;
  color: string;
  action: ButtonConfigAction<void>
}

export class ButtonConfigBuilder {
  public buildingConfig: ButtonConfig;

  public createConfig(): void {
    this.buildingConfig = new ButtonConfig();
  }

  public setupConfig(data: ButtonConfig): void {
    this.buildingConfig = data;
  }

  get config(): ButtonConfig {
    return this.buildingConfig;
  }

}

export class ButtonDirector {
  buildConfig(builder: ButtonConfigBuilder, data: ButtonConfig): ButtonConfig {
    builder.createConfig();
    builder.setupConfig(data);
    return builder.config;
  }
}



