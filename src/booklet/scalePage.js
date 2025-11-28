export function scalePage({ width, height, page }) {
  console.log({width, height});
  console.log({page_width: page.width, page_height: page.height});
  
  let factor = (height / 2) / page.width 
  console.log({factor})
  
  let scale_page = page.scale(factor)

  if (scale_page.height > width) {
    factor =  width / page.height
    console.log({factor})
    scale_page = page.scale(factor)
  }

  return scale_page
}