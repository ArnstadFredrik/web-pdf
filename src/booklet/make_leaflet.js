import { degrees } from 'pdf-lib'

export async function make_leaflet({booklet, first_page, last_page, leaflet_number, short_edge = true}) {
  // Get right and left page
  let right_page = first_page
  let left_page = last_page
  
  if (leaflet_number % 2 === 1) {
    right_page = last_page
    left_page = first_page
  }
  

  // Get page size
  //const {width: rw, height: rh} = right_page.getSize()
  //const {width: lw, height: lh} = left_page.getSize()


  // scale down 50%
  const right_scale = right_page.scale(1)
  const left_scale = left_page.scale(1)

  // create leaflet

  const leaflet = booklet.addPage()
  leaflet.setRotation(degrees(-90))

  if (leaflet_number % 2 === 0 && short_edge) leaflet.setRotation(degrees(90))

  const { width, height } = leaflet.getSize()

  //console.log({width, height})

  // place on leaflet
  leaflet.drawPage(right_page, {
    ...right_scale,
    x: 0,
    y: height,
    rotate: degrees(-90),
  })

  leaflet.drawPage(left_page, {
    ...left_scale,
    x: 0,
    y: height / 2,
    rotate: degrees(-90),
  })
}