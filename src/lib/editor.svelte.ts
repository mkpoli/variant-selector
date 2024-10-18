export interface Editor {
  text: string;
  selection: { start: number; end: number } | null;
  selectedText: string;
  replaceSelectedText: (text: string) => void;
  textarea: HTMLTextAreaElement | undefined;
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
  };
}
