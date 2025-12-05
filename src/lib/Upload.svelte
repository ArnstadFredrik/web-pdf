<script>
    import { data } from "$lib/data.svelte.js";
    import Icon from "$lib/Icon.svelte";
    import { mdiCog } from "@mdi/js";
    import uniqid from "uniqid";
    import { convertAll } from "$lib/handleConvert.js";

    $effect(() => {
        //$inspect({ upload: data.upload });
        $inspect({ files: data.files });
    });

    const storeLocaly = () => {
        localStorage.setItem("files", JSON.stringify(data.files));
    };

    const handleSelect = (e) => {
        data.upload = [];

        [...e.target.files].forEach((file, i) => {
            const fileObject = {
                fileHTML: file,
                buffer: file.arrayBuffer(),
                name: file.name,
                fileName: file.name.split(".pdf")[0],
                download: {},
                key: uniqid(),
            };
            data.upload = [fileObject, ...data.upload];
        });

        data.files = [...data.upload, ...data.files];
        e.target.value = "";
        convertAll();
    };

    const handleMenu = () => {
        data.settingsMenu = data.settingsMenu ? false : true;
    };
</script>

<div class="upload content grid">
    <input
        class="filePicker content"
        onchange={handleSelect}
        type="file"
        id="upload"
        name="upload"
        accept=".pdf"
        multiple
    />
    <button onclick={handleMenu}>
        <Icon mdi={mdiCog} size={1.5} color="white" />
    </button>
</div>

<style>
    .upload {
        gap: 1rem;
        place-items: center;
        justify-items: center;
        grid-template-columns: 2fr 0.3fr;
    }

    .upload input {
        font-size: var(--fs-base);
        padding: 1rem;
        background-color: var(--color-highlight);
        flex-grow: 1;
        border-radius: var(--radius);
        grid-column: 1/2;
        width: 100%;
    }
</style>
