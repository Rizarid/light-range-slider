import './text-field.sass';

class TextField {
  private body: HTMLElement;

  private field: HTMLInputElement;

  private onChange: CustomEvent;

  private isCollection: boolean;

  constructor(target: HTMLElement) {
    this.body = target;
    this.isCollection = this.body.classList.contains('text-field_collection');
    this.field = (this.getField() as HTMLInputElement);
    this.createEvent();
    this.addListener();
  }

  private getField = () => this.body.querySelector('.js-text-field__field');

  private createEvent = () => {
    this.onChange = new CustomEvent('parameterChanged', { bubbles: true, detail: { parameter: '', value: false } });
  };

  private addListener = (): void => {
    this.field.addEventListener('change', this.handleTextFieldChange);
    this.field.addEventListener('update', this.handleUpdate);
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

  private handleUpdate = (event: CustomEvent): void => {
    const { value } = (event.detail as { value: number | string[] });
    if (this.isCollection) {
      this.field.value = (value as string[]).join(', ');
    } else if (value !== undefined) this.field.value = value.toString();
  };
}

export { TextField };
