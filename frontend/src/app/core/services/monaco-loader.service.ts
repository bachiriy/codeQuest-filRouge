import { Injectable } from '@angular/core';
import { loader } from '@monaco-editor/loader';

@Injectable({
  providedIn: 'root'
})
export class MonacoLoaderService {
  private loaded = false;

  async loadMonaco(): Promise<void> {
    if (this.loaded) return;

    await loader.init();
    this.loaded = true;
  }
}
