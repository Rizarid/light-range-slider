import { CustomEventType, IChangeParameterObject, Parameters } from '../../../layers/interfaces/interfaces';
import './text-field.sass';

class TextField {
  private body: HTMLElement;

  private field: HTMLInputElement;

  private onChange: CustomEvent<CustomEventType>;

  private isCollection: boolean;

  constructor(parent: HTMLElement) {
    const body = this.getBody(parent);
    if (body) this.body = body;

    const field = this.getField();
    if (field) this.field = field;

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

  private getBody = (parent: HTMLElement): HTMLElement | null => (
    parent.querySelector('.js-text-field')
  );

  private getField = (): HTMLInputElement | null => (
    this.body.querySelector('.js-text-field__field')
  );

  private createEvent = () => {
    const parameters: IChangeParameterObject = { parameter: Parameters.step, value: 0 };
    this.onChange = new CustomEvent('parameterChanged', { bubbles: true, detail: parameters });
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
