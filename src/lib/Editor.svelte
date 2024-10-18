<script lang="ts">
  import { codePoints, formatCodePoint, segment } from '$lib/text';
  import Copy from '~icons/material-symbols/content-copy-outline';
  import Close from '~icons/material-symbols/close-small-outline';
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

<div class="grid grid-cols-[1fr_auto] gap-4 relative">
  <div class="relative w-full">
    <textarea bind:this={textarea} class="h-full max-h-[50dvh] w-full font-jigmo resize-none"></textarea>
    <button
      onclick={() => {
        navigator.clipboard.writeText(editor.selectedText || editor.text);
      }}
      class="absolute top-px right-px bg-gray-200 px-1 py-1 hover:bg-gray-300 shadow-sm"
    >
      <Copy />
    </button>
  </div>
  <output class="h-full min-w-48 overflow-y-auto max-h-[50dvh]">
    <div class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 mx-auto">
      {#each segment(editor.selectedText || editor.text) as char, i}
        <span class="font-jigmo">{char}</span>
        <code class="flex flex-wrap gap-1">
          {#each codePoints(char) as code, j}
            <div
              class="px-1 bg-gray-100 flex items-center"
              class:unified-ideograph={isCJKUnifiedIdeograph(code)}
              class:variation-selector={isVariationSelector(code)}
              title={String.fromCodePoint(code)}
            >
              {formatCodePoint(code)}
              <button
                class="w-4 h-4 hover:bg-white/50 rounded-full flex items-center justify-center"
                onclick={() => editor.removeCharPointAtCluster(i, j)}
                ><Close />
              </button>
            </div>
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
