import p5 from 'p5'
import { getPixels } from './canvas-utils'
import { getPrediction } from './model'
import { displayPredictions } from './visualize'

let p5Inst: p5 | null = null

let touchTime = Date.now()
let drawCanvas: p5.Graphics | undefined
let finalCanvas: p5.Graphics | undefined
const displaySize = 500
const drawSize = 20
const finalSize = 28
let scaleFactor = 1
const clearDelay = 600
let reevaluate = true

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(displaySize, displaySize)
    p.noSmooth()
    p.strokeWeight(3)
    p.stroke(255)
    drawCanvas = p.createGraphics(drawSize, drawSize)
    scaleFactor = drawSize / displaySize
    drawCanvas.noSmooth()
    drawCanvas.pixelDensity(1)
    drawCanvas.strokeWeight(1.6)
    drawCanvas.stroke(255)
    finalCanvas = p.createGraphics(finalSize, finalSize)
    finalCanvas.noSmooth()
    finalCanvas.pixelDensity(1)
    display()
    p.touchEnded()
    displayPredictions(new Array(10).fill(0))
  }

  p.touchStarted = () => {
    if (!mouseInsideCanvas()) return true
    touchTime = Date.now() - touchTime
    if (touchTime > clearDelay) {
      drawCanvas!.clear(0, 0, 0, 0)
    }
    drawCanvas!.line(
      p.mouseX * scaleFactor,
      p.mouseY * scaleFactor,
      p.mouseX * scaleFactor,
      p.mouseY * scaleFactor
    )
    reevaluate = true
    display()
    return false // prevent context menu
  }

  p.mousePressed = () => {
    p.touchStarted()
  }

  p.touchEnded = () => {
    if (reevaluate) {
      touchTime = Date.now()
      refreshFinalCanvas()
      let pixels = getPixels(finalCanvas!)
      getPrediction(pixels).then((prediction) => {
        displayPredictions(prediction)
      })
      reevaluate = false
    }
    if (!mouseInsideCanvas()) return true
    return false // prevent context menu
  }

  p.touchMoved = () => {
    drawCanvas!.line(
      p.mouseX * scaleFactor,
      p.mouseY * scaleFactor,
      p.pmouseX * scaleFactor,
      p.pmouseY * scaleFactor
    )
    display()
  }

  function display() {
    p.background(240)
    p.push()
    p.blendMode(p.DIFFERENCE)
    p.image(drawCanvas!, 0, 0, displaySize, displaySize)
    p.pop()
    drawGrid()
  }

  function drawGrid() {
    for (let i = 0; i <= drawSize; i++) {
      p.line(i / scaleFactor, 0, i / scaleFactor, displaySize)
      p.line(0, i / scaleFactor, displaySize, i / scaleFactor)
    }
  }

  function mouseInsideCanvas() {
    return (
      p.mouseX >= 0 &&
      p.mouseY >= 0 &&
      p.mouseX <= displaySize &&
      p.mouseY <= displaySize
    )
  }

  function refreshFinalCanvas() {
    finalCanvas!.clear(0, 0, 0, 0)
    finalCanvas!.image(
      drawCanvas!,
      (finalSize - drawSize) / 2,
      (finalSize - drawSize) / 2
    )
  }
}

export function createCanvas() {
  if (p5Inst !== null) return
  p5Inst = new p5(sketch, document.getElementById('p5')!)
}
