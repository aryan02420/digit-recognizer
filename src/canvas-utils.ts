import p5 from 'p5'

export const getPixels = (canvas: p5.Graphics) => {
  let pixels = new Array(canvas.height)
  let alphachannel = 3
  canvas.loadPixels()

  for (let i = 0; i < pixels.length; ++i) {
    pixels[i] = new Array(canvas.width)
    for (let j = 0; j < pixels.length; ++j) {
      let pixelindex = pixels.length * i + j
      let actualindex = (pixelindex << 2) + alphachannel
      pixels[i][j] = [canvas.pixels[actualindex] / 255]
    }
  }
  return pixels
}
