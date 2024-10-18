<script lang="ts">
  let { text = $bindable(), selectedText = $bindable() }: { text: string; selectedText: string } = $props();
  let selection = $state<{ start: number; end: number } | null>(null);

  $effect(() => {
    selectedText = selection ? text.slice(selection.start, selection.end) : '';
  });

  $inspect('selectedText', selectedText);

  const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' });
</script>

<textarea
  class="h-max resize-vertical min-h-16"
  bind:value={text}
  onselectionchange={(e) => (selection = { start: e.currentTarget.selectionStart, end: e.currentTarget.selectionEnd })}
></textarea>
<output class="h-full">
  {#each segmenter.segment(text) as segment}
    <span
      class="hover:bg-green-200/50"
      title={[...segment.segment]
        .map((char) => char.codePointAt(0))
        .map((code) => (code ? `U+${code.toString(16).toUpperCase()}` : ''))
        .join(' ')}
    >
      {segment.segment}
    </span>
  {/each}
</output>

<style lang="postcss">
  textarea,
  output {
    font-family: 'Jigmo', sans-serif;
    @apply border border-black p-2 text-xl;
  }
</style>
