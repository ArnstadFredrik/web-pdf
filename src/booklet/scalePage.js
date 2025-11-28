export function scalePage({ width, height, page }) {
  let factor = (height / 2) / page.width 
  
  let scale_page = page.scale(factor)

  if (scale_page.height > width) {
    factor =  width / page.height
    scale_page = page.scale(factor)
  }

  return scale_page
}