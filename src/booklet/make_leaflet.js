import { degrees } from 'pdf-lib'
import { scalePage } from './scalePage';


export async function make_leaflet({booklet, first_page, last_page, leaflet_number, short_edge = true}) {
  console.log('make_leaflet: starting');
  
  // Get right and left page
  let right_page = first_page
  let left_page = last_page
  
  if (leaflet_number % 2 === 1) {
    right_page = last_page
    left_page = first_page
  }

  // create leaflet
  console.log('create leaflet page');
  
  const leaflet = booklet.addPage()
  leaflet.setRotation(degrees(-90))

  if (leaflet_number % 2 === 0 && short_edge) leaflet.setRotation(degrees(90))

  // scale down to fit
  console.log('scale left and right page to correct size');
  const { width, height } = leaflet.getSize()
  
  
  let right_scale = scalePage({ width, height, page: right_page })
  let left_scale = scalePage({ width, height, page: left_page })

  console.log({right_scale, left_scale});
  

  // check right & left width ageist height / 2
  // scale pages to height / 2
  // check right & left height against width
  // if r/l_height is greater that width, scale down

  

  // place on leaflet
  console.log('draw left and right page on leaflet');
  
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