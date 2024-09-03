export interface Prefecture {
  prefCode: number
  prefName: string
}

export interface PrefecturesResponse {
  message: null
  result: Prefecture[]
}

export interface PopulationCompositionResponse {
  message: null
  result: {
    boundaryYear: number
    data: PopulationComposition[]
  }
}

export interface PopulationComposition {
  label: string
  data: PopulationCompositionData[]
}

export interface PopulationCompositionData {
  year: number
  value: number
}
