import { Component, Input, Output, EventEmitter, ViewChild, type ElementRef, type AfterViewInit } from "@angular/core"
import { CommonModule } from "@angular/common"

declare var monaco: any

@Component({
  selector: "app-code-editor",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #editorContainer [style.height]="height" [style.width]="width" class="border-gray-700"></div>
  `,
})
export class CodeEditorComponent implements AfterViewInit {
  @ViewChild("editorContainer") editorContainer!: ElementRef
  @Input() code = ""
  @Input() language = "javascript"
  @Input() theme: "dark" | "light" = "dark"
  @Input() height = "400px"
  @Input() width = "100%"

  @Output() codeChange = new EventEmitter<string>()

  private editor: any

  ngAfterViewInit(): void {
    // This is a simplified version since we can't actually load Monaco editor in this example
    // In a real application, you would need to load Monaco editor via a script tag or a library like ngx-monaco-editor

    // Simulating editor initialization
    setTimeout(() => {
      this.initMonaco()
    }, 100)
  }

  private initMonaco(): void {
    // In a real implementation, this would initialize Monaco editor
    // For now, we'll create a simple textarea as a placeholder
    const container = this.editorContainer.nativeElement
    const textarea = document.createElement("textarea")
    textarea.value = this.code
    textarea.classList.add(
      "w-full",
      "h-full",
      "p-4",
      "bg-[#0d1117]",
      "text-gray-300",
      "font-mono",
      "text-sm",
      "focus:outline-none",
    )
    textarea.placeholder = "Write your code here..."
    container.appendChild(textarea)

    // Listen for changes
    textarea.addEventListener("input", () => {
      this.code = textarea.value
      this.codeChange.emit(this.code)
    })

    // Simulate editor instance
    this.editor = {
      getValue: () => textarea.value,
      setValue: (value: string) => {
        textarea.value = value
      },
      layout: () => {},
      dispose: () => {
        container.innerHTML = ""
      },
    }
  }

  ngOnChanges(): void {
    if (this.editor) {
      // Update editor content when code input changes
      if (this.editor.getValue() !== this.code) {
        this.editor.setValue(this.code)
      }

      // In a real implementation, you would update language and theme here
    }
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.dispose()
    }
  }
}

