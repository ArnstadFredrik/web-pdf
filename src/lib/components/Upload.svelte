<script>
    import { data } from "$data";
    import Icon from "$component/Icon.svelte";
    import { mdiCog, mdiFileUpload } from "@mdi/js";
    import { handleSelect } from "$js/handleFunctions.js";

    const storeLocaly = () => {
        localStorage.setItem("files", JSON.stringify(data.files));
    };

    const handleMenu = () => {
        data.settingsMenu = data.settingsMenu ? false : true;
    };
</script>

<div class="flex gap-2 items-center">
    <label
        for="upload"
        class="bg-neutral-200 dark:bg-neutral-800 p-6 flex gap-3 items-center"
    >
        <Icon
            mdi={mdiFileUpload}
            size={1.5}
            color="bg-neutral-800 dark:fill-neutral-100"
        />
        <span>Trykk for å velge pdf-filer.</span>
    </label>
    <input
        class="hidden"
        onchange={handleSelect}
        type="file"
        id="upload"
        name="upload"
        accept=".pdf"
        multiple
    />
</div>
