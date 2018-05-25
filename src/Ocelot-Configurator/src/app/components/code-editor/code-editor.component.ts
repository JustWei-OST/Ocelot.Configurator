import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'oc-codeEditor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CodeEditorComponent),
    multi: true
  }]

})
export class CodeEditorComponent implements ControlValueAccessor {
  @Input() disabled: boolean;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  onModelChange: Function = () => { };
  onModelTouched: Function = () => { };

  inputValue: string;
  isDisabled: false;

  constructor() { }

  writeValue(obj: any): void {
    this.inputValue = obj;
  }
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  hanldeChange(event) {
    this.onChange.emit(this.inputValue);
    this.onModelChange(this.inputValue);
  }
}
