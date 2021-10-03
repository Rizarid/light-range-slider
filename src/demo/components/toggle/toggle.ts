import './toggle.sass';

class Toggle {
  private body: HTMLElement;

  private checkbox: HTMLInputElement;

  private onChange: CustomEvent;

  constructor(parent: HTMLElement) {
    this.body = this.getBody(parent);
    this.checkbox = this.getCheckbox();
    this.createEvent();
    this.addListener();
  }

  private getBody = (parent: HTMLElement): HTMLElement => parent.querySelector('.js-toggle');

  public update = (checked: boolean): void => {
    this.checkbox.checked = checked;
  };

  private createEvent = () => {
    this.onChange = new CustomEvent('parameterChanged', { bubbles: true, detail: { parameter: '', value: false } });
  };

  private getCheckbox = (): HTMLInputElement => this.body.querySelector('.js-toggle__checkbox');

  private addListener = (): void => {
    this.checkbox.addEventListener('change', this.handleToggleChange);
  };

  private handleToggleChange = (): void => {
    const { detail } = (this.onChange as { detail: { parameter: string, value: boolean } });
    detail.parameter = this.checkbox.name;
    detail.value = this.checkbox.checked;
    this.body.dispatchEvent(this.onChange);
  };
}

export default Toggle;
