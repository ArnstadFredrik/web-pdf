import fs from 'node:fs/promises'
import { degrees, PDFDocument, StandardFonts, rgb, PageSizes } from 'pdf-lib'

import {sort_booklet} from './sort_booklet.js'
import {make_leaflet} from './make_leaflet.js'

//const getFile = async () => {
//  const file = await fs.readFile('./document.pdf')
//  return file
//}

export async function create_book({file, short_edge = false }) {

  console.log({short_edge})

// import pdf file
//const file = await getFile()

const src_pdf = await PDFDocument.load(file)
let src_pages = src_pdf.getPages()


if ( src_pages.length % 4 !== 0) {
  const length = src_pages.length
  let closest = length + (4 - (length % 4))
  let fill_pages = closest - length
  for (let i = 0; i < fill_pages; i++) {
    console.log({i})
    const empty_page = src_pdf.addPage()
    empty_page.drawText('')
    src_pages = src_pdf.getPages()
  }
}

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
    short_edge,
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