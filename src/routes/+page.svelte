<script>
    import Upload from "$lib/Upload.svelte";
    import Settings from "../lib/Settings.svelte";
    import { data } from "$lib/data.svelte.js";
    import FileList from "../lib/FileList.svelte";

    $effect(() => {
        $inspect({ data });
    });
</script>

<svelte:head>
    <title>PDF Hefte</title>
</svelte:head>

<h1 class="content page_title padding-base">PDF Hefte</h1>
<Upload />
{#if data.settingsMenu}
    <Settings />
{/if}
<FileList />
