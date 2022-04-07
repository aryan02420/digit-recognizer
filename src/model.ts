import * as tf from '@tensorflow/tfjs'
import modelList from './model-list.json'

type TModelName =  keyof typeof modelList

export const getModel = async (modelName: TModelName) => {
  return await tf.loadLayersModel(modelList[modelName])
}

export const listModels = (): TModelName[] => {
  return Object.keys(modelList) as TModelName[]
}
