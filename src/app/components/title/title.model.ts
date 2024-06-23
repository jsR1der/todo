import {TitleType, TailwindFontSizeEnum} from "../../models/tailwind.model";

export interface ITitleConfig {
  title: string;
  type: TitleType;
  size?: TailwindFontSizeEnum;
}
