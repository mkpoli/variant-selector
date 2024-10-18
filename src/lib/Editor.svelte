<script lang="ts">
  import { segment } from '$lib/text';

  import type { Editor } from '$lib/editor.svelte';

  let { editor }: { editor: Editor } = $props();

  let textarea: HTMLTextAreaElement;
  $effect(() => {
    if (textarea) {
      editor.textarea = textarea;
    }
  });
</script>

<div class="grid grid-cols-2 gap-4">
  <textarea bind:this={textarea} class="h-max resize-vertical min-h-16 font-jigmo"></textarea>
  <output class="h-full">
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
  </output>
</div>

<style lang="postcss">
  textarea,
  output {
    @apply border border-black p-2 text-xl;
  }
</style>
