export interface Prefecture {
  prefCode: number
  prefName: string
}

export interface PrefecturesResponse {
  message: null
  result: Prefecture[]
}
