export interface IButtonConfig<P> {
  iconName: string;
  color: string;
  action: (params?: P) => void
}
