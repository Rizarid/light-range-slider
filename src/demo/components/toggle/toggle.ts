import './toggle.sass';

class Toggle {
  private body: HTMLElement;

  private checkbox: HTMLInputElement;

  private onChange: CustomEvent;

  constructor(target: HTMLElement) {
    this.body = target;
    this.checkbox = this.getCheckbox();
    this.createEvent();
    this.addListener();
  }

  private handleUpdate = (event: CustomEvent): void => {
    const { value: checked } = (event.detail as { value: boolean });
    if (checked) this.body.classList.add('toggle_active');
    else this.body.classList.remove('toggle_active');
    this.checkbox.checked = checked;
  };

  private createEvent = () => {
    this.onChange = new CustomEvent('parameterChanged', { bubbles: true, detail: { parameter: '', value: false } });
  };

  private getCheckbox = (): HTMLInputElement => this.body.querySelector('.js-toggle__checkbox');

  private addListener = (): void => {
    this.checkbox.addEventListener('change', this.handleToggleChange);
    this.checkbox.addEventListener('update', this.handleUpdate);
  };

  private handleToggleChange = (): void => {
    const { detail } = (this.onChange as { detail: { parameter: string, value: boolean } });
    this.body.classList.toggle('toggle_active');
    detail.parameter = this.checkbox.name;
    detail.value = this.checkbox.checked;
    this.body.dispatchEvent(this.onChange);
  };
}

export { Toggle };
