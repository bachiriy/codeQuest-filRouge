import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, Input, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import loader from '@monaco-editor/loader';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  template: `<div class="monaco-editor" #editorContainer></div>`,
  styles: [`
    .monaco-editor {
      width: 100%;
      height: 100%;
      min-height: 300px;
    }
  `],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CodeEditorComponent),
    multi: true
  }],
  imports: [CommonModule, FormsModule]
})
export class CodeEditorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() language: string = 'javascript';
  @Input() theme: string = 'vs-dark';
  @Input() height: string = '500px';
  @ViewChild('editorContainer', { static: true }) editorContainerRef!: ElementRef;
  
  private editor: any;
  private _value: string = '';
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  private resizeObserver: ResizeObserver;

  constructor() {
    this.resizeObserver = new ResizeObserver(() => {
      this.editor?.layout();
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadMonaco();
    this.initializeEditor();
    this.resizeObserver.observe(this.editorContainerRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
    if (this.editor) {
      this.editor.dispose();
    }
  }

  private async loadMonaco(): Promise<void> {
    await loader.init();
    // Configure Monaco paths
    (window as any).MonacoEnvironment = {
      getWorkerUrl: (moduleId: string, label: string) => {
        if (label === 'typescript' || label === 'javascript') {
          return './assets/monaco-editor/min/vs/language/typescript/ts.worker.js';
        }
        return './assets/monaco-editor/min/vs/editor/editor.worker.js';
      }
    };
  }

  private initializeEditor(): void {
    const monaco = (window as any).monaco;
    const container = this.editorContainerRef.nativeElement;
    container.style.height = this.height;

    this.editor = monaco.editor.create(container, {
      value: this._value,
      language: this.language,
      theme: this.theme,
      automaticLayout: true,
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      fontSize: 14,
      lineNumbers: 'on',
      roundedSelection: true,
      scrollbar: {
        vertical: 'auto',
        horizontal: 'auto'
      },
      readOnly: false,
      glyphMargin: true,
      renderWhitespace: 'selection'
    });

    this.editor.onDidChangeModelContent(() => {
      const value = this.editor.getValue();
      this._value = value;
      this.onChange(value);
      this.onTouched();
    });
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this._value = value || '';
    if (this.editor) {
      this.editor.setValue(this._value);
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Method to get the editor instance
  getEditor(): any {
    return this.editor;
  }
}
