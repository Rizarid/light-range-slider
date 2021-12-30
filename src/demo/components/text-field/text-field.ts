import { CustomEventType } from '../../../layers/interfaces/interfaces';
import './text-field.sass';

class TextField {
  private body: HTMLElement;

  private field: HTMLInputElement;

  private onChange: CustomEvent<CustomEventType>;

  private isCollection: boolean;

  constructor(parent: HTMLElement) {
    this.body = this.getBody(parent);
    this.field = this.getField();
    this.createEvent();
    this.addListener();
    this.isCollection = this.body.classList.contains('text-field_collection');
  }

  public update = (value: number | string[] | number[]): void => {
    if (Array.isArray(value)) {
      this.field.value = value.join(', ');
    } else if (value !== undefined) this.field.value = value.toString();
    else this.field.value = '';
  };

  public disable = (isDisabled: boolean): void => {
    this.field.disabled = isDisabled;
    this.field.readOnly = isDisabled;
  };

  private getBody = (parent: HTMLElement): HTMLElement => parent.querySelector('.js-text-field');

  private getField = (): HTMLInputElement => this.body.querySelector('.js-text-field__field');

  private createEvent = () => {
    this.onChange = new CustomEvent('parameterChanged', { bubbles: true, detail: { parameter: '', value: 0 } });
  };

  private addListener = (): void => {
    this.field.addEventListener('change', this.handleTextFieldChange);
  };

  private handleTextFieldChange = (): void => {
    const { detail } = this.onChange;
    detail.parameter = this.field.name;
    detail.value = this.isCollection ? this.field.value.split(', ') : Number(this.field.value);
    this.body.dispatchEvent(this.onChange);
  };
}

export default TextField;
