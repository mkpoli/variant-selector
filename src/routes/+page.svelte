<script lang="ts">
  import Editor from '$lib/Editor.svelte';

  let text = $state('精󠄀');
</script>

<h1 class="text-center w-full text-2xl my-4">Variant Selector Dictionary</h1>

<main class="max-w-screen-md mx-auto grid grid-cols-2 gap-4">
  <Editor {text} />
</main>
