export class PageRoutes {
  static forgotPassword() {
    return `/forgotPassword`
  }
  static login() {
    return `/login`
  }
  static home() {
    return `/home`
  }
  static others() {
    return ``
  }
  static users() {
    return `/users`
  }
  static uploads() {
    return `/uploads`
  }
  static storageSyncedFiles() {
    return `/storage-synced-files`
  }

  // cash flow
  static cashFlow() {
    return `/cash-flow/simulate`
  }
  static championCattle() {
    return `/cash-flow/champion-cattle`
  }

  // cattle-registries
  static cattleRegistries() {
    return `/cattle-registries`
  }

  static cattlePurchase() {
    return `/cattle-registries/cattle-purchase`
  }

  // stock
  static stock() {
    return `/stock`
  }
  static miStock() {
    return `/stock/mi`
  }
  static meStock() {
    return `/stock/me`
  }
  static stockBalance() {
    return `/stock/stock-balance`
  }

  // freights
  static freights() {
    return `/freights`
  }
  static cattlePurchaseFreights() {
    return `/freights/cattle-purchase-freights`
  }

  // humanResources
  static humanResources() {
    return `/human-resources`
  }
  static humanResourcesHours() {
    return `/human-resources/human-resources-hours`
  }
}
