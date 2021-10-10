import './text-field.sass';

class TextField {
  private body: HTMLElement;

  private field: HTMLInputElement;

  private onChange: CustomEvent;

  private isCollection: boolean;

  constructor(parent: HTMLElement) {
    this.body = this.getBody(parent);
    this.field = this.getField();
    this.createEvent();
    this.addListener();
    this.isCollection = this.body.classList.contains('text-field_collection');
  }

  private getBody = (parent: HTMLElement): HTMLElement => parent.querySelector('.js-text-field');

  public update = (value: number | string[]): void => {
    if (Array.isArray(value)) {
      this.field.value = value.join(', ');
    } else if (value !== undefined) this.field.value = value.toString();
    else this.field.value = '';
  };

  public disable = (isDisabled: boolean): void => {
    this.field.disabled = isDisabled;
    this.field.readOnly = isDisabled;
  };

  private getField = (): HTMLInputElement => this.body.querySelector('.js-text-field__field');

  private createEvent = () => {
    this.onChange = new CustomEvent('parameterChanged', { bubbles: true, detail: { parameter: '', value: false } });
  };

  private addListener = (): void => {
    this.field.addEventListener('change', this.handleTextFieldChange);
  };

  private handleTextFieldChange = (): void => {
    const { detail } = (this.onChange as { detail: {
      parameter: string,
      value: number | string[]
    } });
    detail.parameter = this.field.name;
    detail.value = this.isCollection ? this.field.value.split(', ') : Number(this.field.value);
    this.body.dispatchEvent(this.onChange);
  };
}

export default TextField;
