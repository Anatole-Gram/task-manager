const useImageResize = (imgEl, maxWidth, maxHeight) => {
    let width = imgEl.width
    let height = imgEl.height

    if (width > height) {
        if (width > maxWidth) {
            height = height * (maxWidth / width);
            width = maxWidth;
        }
    } else {
        if (height > maxHeight) {
            width = width * (maxHeight / height);
            height = maxHeight;
        }
    }

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    let ctx = canvas.getContext("2d")
    ctx.drawImage(imgEl, 0, 0, width, height)
    return canvas.toDataURL()
}

export {useImageResize}