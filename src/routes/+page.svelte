<script lang="ts">
  import Editor from '$lib/Editor.svelte';
  import { segment, codePoints } from '$lib/text';
  let text = $state('精󠄀清從心邪');
  let selectedText = $state('');
</script>

<h1 class="text-center w-full text-2xl my-4">Variant Selector Dictionary</h1>

<main class="max-w-screen-md mx-auto grid grid-cols-2 gap-4">
  <Editor bind:text bind:selectedText />
  <div class="grid grid-cols-2 gap-4">
    {#each segment(selectedText) as char}
      <span class="font-jigmo">{char}</span>
      <code class="flex flex-wrap gap-1">
        {#each codePoints(char) as code}
          <span>U+{code}</span>
        {/each}
      </code>
    {/each}
  </div>
</main>
