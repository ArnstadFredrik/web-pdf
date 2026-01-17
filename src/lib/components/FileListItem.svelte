<script>
    import Icon from "$component/Icon.svelte";
    import { mdiFileDownload, mdiPrinter, mdiEye, mdiDelete } from "@mdi/js";
    import { data } from "$data";
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import Loader from "$component/Loader.svelte";

    let { file, i } = $props();

    let printJS;

    onMount(async () => {
        const p = await import("print-js");
        printJS = p.default;
    });

    const handlePrint = (e) => {
        if (browser && file.download) {
            printJS(file.download.url);
        }
    };
    const handlePreview = (e) => {
        console.log(e);
    };
    const handleDelete = (e) => {
        data.files = data.files.filter((e) => e.key != file.key);
    };
</script>

<div
    class="grid grid-cols-4 gap-2 bg-neutral-200 dark:bg-neutral-800 p-5 rounded-sm"
    data-key={file.key}
>
    <p class="col-span-4">{file.name}</p>
    {#if file.process == "working"}
        <Loader />
    {:else if file.process == "done"}
        <a
            href={file.download.url}
            download={`${file.fileName}-hefte.pdf`}
            class="place-self-center"
        >
            <button class="button-green">
                <Icon mdi={mdiFileDownload} />
            </button>
        </a>
        <button onclick={handlePrint} class="button-green place-self-center">
            <Icon mdi={mdiPrinter} />
        </button>
        <a href={file.download.url} target="_blank" class="place-self-center">
            <button onclick={handlePreview} class="button-blue">
                <Icon mdi={mdiEye} />
            </button>
        </a>
        <button
            onclick={handleDelete}
            data-key={file.key}
            class="button-red place-self-center"
        >
            <Icon mdi={mdiDelete} />
        </button>
    {/if}
</div>
