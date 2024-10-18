<script lang="ts">
  import Editor from '$lib/Editor.svelte';
  import { segment, codePoints, formatCodePoint } from '$lib/text';
  import { createEditor } from '$lib/editor.svelte';
  import VariableSelectorInputButton from '$lib/VariantSelectorInputButton.svelte';
  import { dev } from '$app/environment';
  import { isCJKUnifiedIdeograph, isVariationSelector } from '$lib/unicode';
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
  <div class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 mx-auto">
    {#each segment(editor.selectedText || editor.text) as char}
      <span class="font-jigmo">{char}</span>
      <code class="flex flex-wrap gap-1">
        {#each codePoints(char) as code}
          <span
            class="px-1"
            class:unified-ideograph={isCJKUnifiedIdeograph(code)}
            class:variation-selector={isVariationSelector(code)}
            title={String.fromCodePoint(code)}
          >
            {formatCodePoint(code)}
          </span>
        {/each}
      </code>
    {/each}
  </div>
</main>

<style lang="postcss">
  .unified-ideograph {
    @apply bg-blue-200;
  }
  .variation-selector {
    @apply bg-green-200;
  }
</style>
