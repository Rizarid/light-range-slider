import './toggle.sass';

class Toggle {
  private body: HTMLElement;

  private checkbox: HTMLInputElement;

  constructor(target: HTMLElement) {
    this.body = target;
    this.checkbox = this.createCheckbox();
    this.addListener();
  }

  public getCheckbox = (): HTMLInputElement => this.checkbox;

  public changeChecked = (checked: boolean): void => {
    if (checked) this.body.classList.add('toggle_active');
    else this.body.classList.remove('toggle_active');
    this.checkbox.checked = checked;
  };

  private createCheckbox = (): HTMLInputElement => this.body.querySelector('.js-toggle__checkbox');

  private addListener = (): void => { this.checkbox.addEventListener('change', this.handleToggleClick); };

  private handleToggleClick = (): void => { this.body.classList.toggle('toggle_active'); };
}

export { Toggle };
