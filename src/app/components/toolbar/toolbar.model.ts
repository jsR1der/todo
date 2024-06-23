export interface IToolbarAction {
  action: (...args: any[]) => void;
  iconName: string;
}
