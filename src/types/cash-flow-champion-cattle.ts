// SIMULATION FORM INTERFACES
export interface ProjectionControls {
  diasProjecao: number
}

export interface RawMaterialControls {
  cbs: number
  pDt: number
  pPa: number
  pTr: number
  pesoArroba: number
  precoArroba: number
  precoFreteKg: number
}

export interface Operation {
  arredKg: number
  precoEmbalagem: number
  precoMod: number
  tipoArrend: string
}

export interface MiControls {
  pComissoesMi: number
  pImpostosMi: number
  precoFreteMi: number
}

export interface MeControls {
  ptax: number
  precoFreteRodoviario: number
  precoPorto: number
  precoFreteInter: number
  precoFinanc: number
}

export interface MePrices {
  dt: {
    pAcem: number
    pGorduraExt: number
    pGorduraInt: number
    pMusculo: number
    pPaleta: number
    pPeito: number
  }
  pa: {
    pCostela: number
  }
  tr: {
    pBananinha: number
    pContraFile: number
    pCoxaoDuro: number
    pCoxaoMole: number
    pFileMignon: number
    pFileCostela: number
    pCorAlcatra: number
    pPicanha: number
    pLagarto: number
    pMusculoMole: number
    pMusculoDuro: number
    pPatinho: number
    pRecortes: number
    pRoubado: number
    pMaminha: number
    pFralda: number
  }
}

export interface MiPrices {
  dt: {
    pAcem: number
    pPaleta: number
    pCupim: number
    pMusculo: number
    pPeito: number
    pRecortes: number
  }
  pa: {
    pCostela: number
    pBifeVazio: number
  }
  tr: {
    pBananinha: number
    pCapaFile: number
    pContraFile: number
    pCorAlcatra: number
    pCoxaoDuro: number
    pCoxaoMole: number
    pFileMignon: number
    pFralda: number
    pLagarto: number
    pMaminha: number
    pMusculo: number
    pPatinho: number
    pPicanha: number
    pRecAlcatra: number
    pRecortes: number
    pGordura: number
  }
}

export interface MeIncomes {
  dt: {
    pAcem: number
    pPeito: number
    pGorduraExt: number
    pGorduraInt: number
    pMusculo: number
    pPaleta: number
  }
  pa: {
    pCostela: number
  }
  tr: {
    pBananinha: number
    pLagarto: number
    pContraFile: number
    pMusculoMole: number
    pCoxaoDuro: number
    pMusculoDuro: number
    pCoxaoMole: number
    pPatinho: number
    pFileMignon: number
    pRecortes: number
    pFileCostela: number
    pRoubado: number
    pCorAlcatra: number
    pMaminha: number
    pPicanha: number
    pFralda: number
  }
}

export interface MiIncomes {
  dt: {
    pAcem: number
    pCupim: number
    pMusculo: number
    pPaleta: number
    pPeito: number
    pRecortes: number
  }
  pa: {
    pBifeVazio: number
    pCostela: number
  }
  tr: {
    pBananinha: number
    pCapaFile: number
    pContraFile: number
    pCorAlcatra: number
    pCoxaoDuro: number
    pCoxaoMole: number
    pFileMignon: number
    pFralda: number
    pGordura: number
    pLagarto: number
    pMaminha: number
    pMusculo: number
    pPatinho: number
    pPicanha: number
    pRecAlcatra: number
    pRecortes: number
  }
}

// SIMULATION RESULTS
export enum TipoArrendEnum {
  KG_ENTRADA = 'KG_ENTRADA',
  KG_SAIDA = 'KG_SAIDA',
}
