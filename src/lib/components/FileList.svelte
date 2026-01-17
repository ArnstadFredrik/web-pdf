<script>
    import { data } from "$data";
    import FileListItem from "$component/FileListItem.svelte";
</script>

<div class="grid gap-3">
    {#each data.files as file, i (file.key)}
        <FileListItem {file} {i} />
    {/each}
</div>
