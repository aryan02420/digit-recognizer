import * as tf from '@tensorflow/tfjs'
import modelList from './model-list.json'

type TModelName = keyof typeof modelList

let model: tf.LayersModel | null = null

export const listModels = (): TModelName[] => {
  return Object.keys(modelList) as TModelName[]
}

export const loadModel = async (modelName: TModelName) => {
  model = await tf.loadLayersModel(modelList[modelName])
}

export const getPrediction = async (input: number[]) => {
  if (model === null) model = await tf.loadLayersModel(modelList.template)
  const result = model.predict(tf.tensor([input])) as tf.Tensor<tf.Rank>
  return (await result.array() as [number[]])[0]
}
