<script>
    import Upload from "$component/Upload.svelte";
    import Settings from "$component/Settings.svelte";
    import { data } from "$data";
    import FileList from "$component/FileList.svelte";
</script>

<svelte:head>
    <title>PDF Hefte</title>
</svelte:head>

<h1>PDF Hefte</h1>
<Upload />
<Settings />
<FileList />
