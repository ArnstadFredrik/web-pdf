import fs from 'node:fs/promises'
import { degrees, PDFDocument, StandardFonts, rgb, PageSizes } from 'pdf-lib'

import {sort_booklet} from './sort_booklet.js'
import {make_leaflet} from './make_leaflet.js'

//const getFile = async () => {
//  const file = await fs.readFile('./document.pdf')
//  return file
//}

export async function create_book({file}) {


// import pdf file
//const file = await getFile()

const src_pdf = await PDFDocument.load(file)
const src_pages = src_pdf.getPages()

// create booklet document
const booklet = await PDFDocument.create(PageSizes.A4)



// make leaflets pages.length / 2
const length = src_pages.length
const leaflets_needed = src_pages.length / 2

console.log({length,leaflets_needed})

const embedded_pages_sorted = await sort_booklet({booklet, src_pages})

embedded_pages_sorted.forEach(async (leaflet, i) => {
  await make_leaflet({
    booklet,
    first_page: leaflet[1],
    last_page: leaflet[0],
    leaflet_number: i,
    short_edge: false
  })
})

// draw pages together, two original on each leaflet from oposing ends of the document.
// 2 alternatives:
// (short edge) alternate right and left
// [ last, first ]
// [ second, second to last ]
// (long edge) rotate 180, but don't alternate
// [ first, last ]
// [ second, second to last ]

const pdfBytes = await booklet.save()

//fs.writeFile('./document-mod.pdf', pdfBytes, err => {
//  if (err) console.error(err)
//})

return pdfBytes

}