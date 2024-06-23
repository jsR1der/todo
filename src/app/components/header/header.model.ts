import {HeaderType, TailwindFontSizeEnum} from "../../models/tailwind.model";

export interface IHeaderConfig {
  title: string;
  type: HeaderType
  fontSize?: TailwindFontSizeEnum;
}
