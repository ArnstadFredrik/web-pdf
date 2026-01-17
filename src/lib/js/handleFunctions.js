import uniqid from "uniqid";
import { data } from "$data";
import { create_book } from "$lib/booklet/book.js";
import { shortEdgeState } from "$lib/components/Settings.svelte";

export const handleSelect = (e) => {
  data.upload = [];

  console.log({ target: e.target.files, dataTransfer: e.dataTransfer });

  if (e.target.files) {
    [...e.target.files].forEach((file, i) => {
      const fileObject = createFileObject(file);
      data.upload = [fileObject, ...data.upload];
    });
  }

  if (e.dataTransfer) {
    [...e.dataTransfer.items].forEach((file) => {
      const fileObject = createFileObject(file.getAsFile());
      data.upload = [fileObject, ...data.upload];
    });
  }

  data.files = [...data.upload, ...data.files];
  e.target.value = "";
  convertAll();
};

const createFileObject = (file) => {
  return {
    fileHTML: file,
    buffer: file.arrayBuffer(),
    name: file.name,
    fileName: file.name.split(".pdf")[0],
    download: {},
    key: uniqid(),
  };
};

export const convertAll = () => {
  console.log(shortEdgeState());
  const tmpFiles = data.files.forEach(async (file, i) => {
    data.files[i].process = "working";
    const convertedFile = await handleConvert({
      file: await file.buffer,
      short_edge: shortEdgeState(),
    });
    data.files[i].download = convertedFile;
    data.files[i].process = "done";
  });
  return tmpFiles;
};

export const handleConvert = async ({ file, short_edge }) => {
  const pdfArray = await create_book({
    file,
    short_edge,
  });
  const pdf = new Blob([pdfArray], { type: "application/pdf" });
  const download = {
    pdf,
    url: URL.createObjectURL(pdf),
  };
  return download;
};

export const handleDrop = (e) => {
  e.preventDefault();
  console.log({ files });
};
