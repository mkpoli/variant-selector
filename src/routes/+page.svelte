<script lang="ts">
  import Editor from '$lib/Editor.svelte';
  import { createEditor } from '$lib/editor.svelte';
  import VariableSelectorInputButton from '$lib/VariantSelectorInputButton.svelte';
  import { dev } from '$app/environment';
  let editor = createEditor(dev ? '精󠄀清從心邪' : '');
</script>

<h1 class="text-center w-full text-2xl my-4">Variant Selector Dictionary</h1>

<main class="max-w-screen-sm mx-auto flex flex-col gap-4">
  <Editor {editor} />
  <div>
    <VariableSelectorInputButton
      onclick={(codePoint) => {
        editor.replaceSelectedText(String.fromCodePoint(codePoint));
      }}
    />
  </div>
</main>
