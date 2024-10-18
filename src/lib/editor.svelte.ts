export interface Editor {
  text: string;
  selection: { start: number; end: number } | null;
  selectedText: string;
  textarea: HTMLTextAreaElement | undefined;
}

export function createEditor(initialText: string): Editor {
  let text = $state(initialText);
  let selection = $state<{ start: number; end: number } | null>(null);
  let selectedText = $derived(selection ? text.slice(selection.start, selection.end) : '');
  let textarea: HTMLTextAreaElement | undefined = $state(undefined);

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
  };
}
