import * as d3 from 'd3'
import { createCanvas, predictAndShow } from './canvas'
import { loadModel, listModels } from './model'

const modelPicker = document.getElementById('model_picker')! as HTMLSelectElement
const loader = document.getElementById('loading')!

const availableModels = listModels()
d3.select(modelPicker).selectAll('option').data(availableModels).enter().append('option').attr('value', d => d).text(d => d)

createCanvas()

const refreshView = async () => {
  loader.hidden = false
  await loadModel(modelPicker.value as typeof availableModels[number])
  predictAndShow()
  loader.hidden = true
}

modelPicker.addEventListener('change', refreshView)

;(async () => {
  await refreshView()
})()