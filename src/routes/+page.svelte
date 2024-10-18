<script lang="ts">
  import Editor from '$lib/Editor.svelte';
  import { segment, codePoints, formatCodePoint } from '$lib/text';
  import { createEditor } from '$lib/editor.svelte';
  import VariableSelectorInputButton from '$lib/VariantSelectorInputButton.svelte';
  import { dev } from '$app/environment';
  let editor = createEditor(dev ? '精󠄀清從心邪' : '');
</script>

<h1 class="text-center w-full text-2xl my-4">Variant Selector Dictionary</h1>

<main class="max-w-screen-md mx-auto flex flex-col gap-4">
  <Editor {editor} />
  <div>
    <VariableSelectorInputButton
      onclick={(codePoint) => {
        editor.replaceSelectedText(String.fromCodePoint(codePoint));
      }}
    />
  </div>
  <div class="grid grid-cols-[auto_1fr] gap-x-4 mx-auto">
    {#each segment(editor.selectedText || editor.text) as char}
      <span class="font-jigmo">{char}</span>
      <code class="flex flex-wrap gap-1">
        {#each codePoints(char) as code}
          <span>{formatCodePoint(code)}</span>
        {/each}
      </code>
    {/each}
  </div>
</main>
