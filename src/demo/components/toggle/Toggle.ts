import './toggle.sass';

class Toggle {
  private body: HTMLElement;

  private checkbox: HTMLInputElement;

  private onChange: CustomEvent<{ parameter: string, value: boolean }>;

  constructor(parent: HTMLElement) {
    const body = this.getBody(parent);
    if (body) this.body = body;

    const checkbox = this.getCheckbox();
    if (checkbox) this.checkbox = checkbox;

    this.createEvent();
    this.addListener();
  }

  public update = (checked: boolean): void => {
    this.checkbox.checked = checked;
  };

  private getBody = (parent: HTMLElement): HTMLElement | null => (
    parent.querySelector('.js-toggle')
  );

  private createEvent = () => {
    this.onChange = new CustomEvent('parameterChanged', { bubbles: true, detail: { parameter: '', value: false } });
  };

  private getCheckbox = (): HTMLInputElement | null => (
    this.body.querySelector('.js-toggle__checkbox')
  );

  private addListener = (): void => {
    this.checkbox.addEventListener('change', this.handleToggleChange);
  };

  private handleToggleChange = (): void => {
    const { detail } = this.onChange;
    detail.parameter = this.checkbox.name;
    detail.value = this.checkbox.checked;
    this.body.dispatchEvent(this.onChange);
  };
}

export default Toggle;
