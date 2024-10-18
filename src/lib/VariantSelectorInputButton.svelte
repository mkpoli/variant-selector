<script lang="ts">
  let { onclick }: { onclick: (codePoint: number) => void } = $props();

  function getVSType(n: number): 'VS' | 'IVS' | 'VSS' {
    if (n <= 16) {
      return 'VS';
    } else if (n <= 48) {
      return 'IVS';
    } else {
      return 'VSS';
    }
  }

  function calcCodePoint(n: number): number {
    if (n <= 16) {
      // VS (U+FE00..U+FE0F)
      return 0xfe00 + n - 1;
    } else {
      // VSS (U+E0100..U+E011F)
      return 0xe0100 + n - 16 - 1;
    }
  }
</script>

<div class="grid grid-cols-[repeat(16,auto)] gap-[0.125em] max-h-32 overflow-y-auto overflow-x-hidden w-max mx-auto">
  {#each Array.from({ length: 256 }, (_, i) => i + 1) as n}
    {@const codePoint = calcCodePoint(n)}
    <button
      class="w-6 h-6 text-white font-mono hover:cursor-pointer text-center text-2xs leading-[1em] vertical-text"
      class:bg-purple-600={getVSType(n) === 'VS'}
      class:hover:bg-purple-700={getVSType(n) === 'VS'}
      class:bg-green-600={getVSType(n) === 'IVS'}
      class:hover:bg-green-700={getVSType(n) === 'IVS'}
      class:bg-slate-600={getVSType(n) === 'VSS'}
      class:hover:bg-slate-700={getVSType(n) === 'VSS'}
      title={`U+${codePoint.toString(16).toUpperCase()}`}
      onclick={() => {
        onclick(codePoint);
      }}
    >
      VS<br />{n}
    </button>
  {/each}
</div>
