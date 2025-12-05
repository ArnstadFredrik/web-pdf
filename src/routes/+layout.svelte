<script>
    import PWA from "$lib/PWA.svelte";
    let { children } = $props();
</script>

<PWA />

{@render children()}
