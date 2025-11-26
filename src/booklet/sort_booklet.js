export async function sort_booklet({booklet, src_pages}) {
    const embedded_pages = await booklet.embedPages([...src_pages])
    
    const length = embedded_pages.length
    // [fist,last] etc.
    const bookList = []

    for (let i = 0; i < length / 2; i++ ) {
        const r = i
        const l = (length - 1) - i
        const leaflet = [embedded_pages[r], embedded_pages[l]]
        bookList.push(leaflet)
    }

    return bookList
    
}