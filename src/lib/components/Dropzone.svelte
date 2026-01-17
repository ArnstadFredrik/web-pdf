<script>
    import Dropzone from "dropzone";

    let myDropzone = new Dropzone(".dropzone");
    myDropzone.on("addedfile", (file) => {
        console.log(e);
    });
</script>

<form class="dropzone" action="" method="post" enctype="multipart/form-data">
    <input type="file" name="file" />
</form>
