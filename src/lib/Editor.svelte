<script lang="ts">
  import { segment } from '$lib/text';

  let { text = $bindable(), selectedText = $bindable() }: { text: string; selectedText: string } = $props();
  let selection = $state<{ start: number; end: number } | null>(null);

  $effect(() => {
    selectedText = selection ? text.slice(selection.start, selection.end) : '';
  });

  $inspect('selectedText', selectedText);
</script>

<textarea
  class="h-max resize-vertical min-h-16 font-jigmo"
  bind:value={text}
  onselectionchange={(e) => (selection = { start: e.currentTarget.selectionStart, end: e.currentTarget.selectionEnd })}
></textarea>
<output class="h-full">
  {#each segment(text) as seg}
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

<style lang="postcss">
  textarea,
  output {
    @apply border border-black p-2 text-xl;
  }
</style>
