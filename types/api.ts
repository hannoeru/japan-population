import type { PopulationComposition } from './resas'

export interface Population {
  prefCode: number
  prefName: string
  data: PopulationComposition[]
}
