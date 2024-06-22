export class ButtonConfig<P> {
  iconName: string;
  color: string;
  action: (params?: P) => void = () => {
    console.log('Button clicked');
  }
}
