<script lang="ts">
  const segmenter = new Intl.Segmenter('en', { granularity: 'word' });
  let text = $state('精󠄀');
</script>

<h1 class="text-center w-full text-2xl my-4">Variant Selector Dictionary</h1>

<main class="max-w-screen-md mx-auto grid grid-cols-2 gap-4">
  <textarea class="h-max resize-vertical min-h-16" bind:value={text}></textarea>
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
</main>

<style lang="postcss">
  textarea,
  output {
    font-family: 'Jigmo', sans-serif;
    @apply border border-black p-2 text-xl;
  }
</style>
