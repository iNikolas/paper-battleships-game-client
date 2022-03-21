const handleScroll = (element) => {
    if (!element) return
    element.scroll({
        top: element.scrollHeight,
        behavior: 'smooth'
    })
}

export default handleScroll