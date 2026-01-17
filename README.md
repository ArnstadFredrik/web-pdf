# PDF Hefte

## Docker

```docker
services:
  app:
    container_name: web-pdf
    image: ghcr.io/arnstadfredrik/web-pdf:latest
    ports:
      - 3000:3000
```

## TODO

- [x] Add full screen modal to display booklet pdf
- [x] Add support for multiple files
- [x] Separate upload list, and workspace list. Add support for removing files from workspace, and uploading new, without deleting the entire list.
- [x] Manifest file and web app support
