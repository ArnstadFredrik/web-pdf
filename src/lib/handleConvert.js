import { create_book } from "$lib/booklet/book.js";
import { data } from "$lib/data.svelte.js";

export const convertAll = () => {
  const tmpFiles = data.files.forEach(async (file, i) => {
    data.files[i].process = "working";
    const convertedFile = await handleConvert({
      file: await file.buffer,
      short_edge: data.settings[0].state,
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
