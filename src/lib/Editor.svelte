<script lang="ts">
  import { codePoints, formatCodePoint, segment } from '$lib/text';

  import type { Editor } from '$lib/editor.svelte';
  import { isCJKUnifiedIdeograph, isVariationSelector } from './unicode';

  let { editor }: { editor: Editor } = $props();

  let textarea: HTMLTextAreaElement;
  $effect(() => {
    if (textarea) {
      editor.textarea = textarea;
    }
  });
</script>

<div class="grid grid-cols-[1fr_auto] gap-4">
  <textarea bind:this={textarea} class="h-max min-h-full font-jigmo"></textarea>
  <output class="h-full min-w-48">
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
  </output>
  <!-- <output class="h-full">
    {#each segment(editor.text) as seg}
      <span
        class="hover:bg-green-200/50 font-jigmo"
        title={[...seg]
          .map((char) => char.codePointAt(0))
          .map((code) => (code ? `U+${code.toString(16).toUpperCase()}` : ''))
          .join(' ')}
      >
        {seg}
      </span>
    {/each}
  </output> -->
</div>

<style lang="postcss">
  textarea {
    @apply border border-black p-2 text-xl;
  }

  .unified-ideograph {
    @apply bg-blue-200;
  }
  .variation-selector {
    @apply bg-green-200;
  }
</style>
