<script lang="ts">
  const segmenter = new Intl.Segmenter('en', { granularity: 'word' });
  let text = $state('精󠄀');
</script>

<h1>Variant Selector Dictionary</h1>

<main>
  <textarea bind:value={text}></textarea>
  <output>
    {#each segmenter.segment(text) as segment}
      <span
        class="segment"
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

<style>
  textarea,
  output {
    font-family: 'Jigmo', sans-serif;
    border: 1px solid #000;
    padding: 1rem;
    font-size: 1.5rem;
  }

  .segment:hover {
    background-color: rgba(109, 255, 182, 0.265);
  }

  main {
    max-width: 1024px;
    margin: 0 auto;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
</style>
