<script>
    import { data } from "$lib/data.svelte.js";
    import FileListItem from "$lib/FileListItem.svelte";
</script>

<div class="info content grid">
    {#each data.files as file, i (file.key)}
        <FileListItem {file} {i} />
    {/each}
</div>

<style>
    .info {
        font-size: var(--fs-base);
        gap: 1rem;
    }
</style>
