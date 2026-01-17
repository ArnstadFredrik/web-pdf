<script>
    import PWA from "$component/PWA.svelte";
    import "$lib/styles/app.css";
    import { pd_drop, pd_dragover } from "$lib/js/utils.js";
    import { handleDrop, handleSelect } from "$lib/js/handleFunctions.js";

    let { children } = $props();
</script>

<svelte:window ondrop={pd_drop} ondragover={pd_dragover} />

<PWA />

<div class="bg-neutral-100 dark:bg-neutral-900 min-h-dvh" ondrop={handleSelect}>
    <main class="flex flex-col items-center gap-5 p-5 min-h-full">
        {@render children()}
    </main>
</div>
