import { segment } from './text';

export interface Editor {
  text: string;
  selection: { start: number; end: number } | null;
  selectedText: string;
  textarea: HTMLTextAreaElement | undefined;

  replaceSelectedText: (text: string) => void;
  removeCharPointAt: (index: number) => void;
  removeCharPointAtCluster: (clusterIndex: number, charPointIndex: number) => void;
}

export function createEditor(initialText: string): Editor {
  let text = $state(initialText);
  let selection = $state<{ start: number; end: number } | null>(null);
  let selectedText = $derived(selection ? text.slice(selection.start, selection.end) : '');
  let textarea: HTMLTextAreaElement | undefined = $state(undefined);

  $effect(() => {
    if (textarea) {
      textarea.value = text;
      textarea?.addEventListener('selectionchange', () => {
        if (textarea) {
          selection = { start: textarea.selectionStart, end: textarea.selectionEnd };
        }
      });
      textarea.addEventListener('input', () => {
        if (textarea) {
          text = textarea.value;
        }
      });
    }
  });

  return {
    get textarea() {
      return textarea;
    },
    set textarea(value: HTMLTextAreaElement | undefined) {
      textarea = value;
    },
    get text() {
      return text;
    },
    set text(value: string) {
      text = value;
      if (textarea) {
        textarea.value = text;
      }
    },
    get selection() {
      return selection;
    },
    set selection(value: { start: number; end: number } | null) {
      selection = value;
      if (selection && textarea) {
        textarea.setSelectionRange(selection.start, selection.end);
      }
    },
    get selectedText(): string {
      return selectedText;
    },
    replaceSelectedText(text: string) {
      if (selection && textarea) {
        this.text = this.text.slice(0, selection.start) + text + this.text.slice(selection.end);
      } else {
        this.text = this.text + text;
      }
    },
    removeCharPointAt(index: number) {
      if (textarea) {
        this.text = [...this.text].toSpliced(index, 1).join('');
      }
    },
    removeCharPointAtCluster(clusterIndex: number, charPointIndex: number) {
      if (this.selectedText && this.selection !== null) {
        const clusters = segment(this.selectedText);
        const charPointsBefore = clusters.slice(0, clusterIndex).reduce((acc, seg) => acc + [...seg].length, 0);

        this.text =
          this.text.slice(0, this.selection.start) +
          [...this.selectedText].toSpliced(charPointsBefore + charPointIndex, 1).join('') +
          this.text.slice(this.selection.end);
      } else {
        const clusters = segment(this.text);
        const charPointsBefore = clusters.slice(0, clusterIndex).reduce((acc, seg) => acc + [...seg].length, 0);

        this.text = [...this.text].toSpliced(charPointsBefore + charPointIndex, 1).join('');
      }
    },
  };
}
