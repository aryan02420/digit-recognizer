import * as d3 from 'd3'

import './style.css'
import { createCanvas } from './canvas'
import { loadModel } from './model'
import { displayPredictions } from './visualize'

;(async () => {
  createCanvas()
  await loadModel('template')
  displayPredictions([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  d3.select('#loading').remove()
})()
