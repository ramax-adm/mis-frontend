export class PageRoutes {
  static forgotPassword() {
    return `/forgotPassword`;
  }
  static login() {
    return `/login`;
  }
  static home() {
    return `/home`;
  }

  // others
  static others() {
    return ``;
  }
  static users() {
    return `/users`;
  }

  static settings() {
    return `/settings`;
  }

  static uploads() {
    return `/uploads`;
  }
  static storageSyncedFiles() {
    return `/storage-synced-files`;
  }
  static parameters() {
    return `/parameters`;
  }

  // business summary
  static operationFinanceSummary() {
    return `business-summary/operation-finance`;
  }

  static businessAudit() {
    return `/business-audit`;
  }

  // cash flow
  static intranet() {
    return `/intranet`;
  }

  // cash flow
  static cashFlow() {
    return `/cash-flow/simulate`;
  }
  static championCattle() {
    return `/cash-flow/champion-cattle`;
  }

  // cattle-registries
  static cattleRegistries() {
    return `/cattle-registries`;
  }

  static cattlePurchase() {
    return `/cattle-registries/cattle-purchase`;
  }

  // stock
  static stock() {
    return `/stock`;
  }
  static miStock() {
    return `/stock/mi`;
  }
  static meStock() {
    return `/stock/me`;
  }

  static incomingBatches() {
    return `/stock/incoming-batches`;
  }
  static stockBalance() {
    return `/stock/stock-balance`;
  }

  static inventory() {
    return `/stock/inventory`;
  }

  // freights
  static freights() {
    return `/freights`;
  }
  static anttConsultation() {
    return `/freights/antt-consultation`;
  }
  static cattlePurchaseFreights() {
    return `/freights/cattle-purchase-freights`;
  }

  // freights
  static sales() {
    return `/sales`;
  }
  static invoices() {
    return `/sales/invoices`;
  }

  // humanResources
  static humanResources() {
    return `/human-resources`;
  }
  static humanResourcesHours() {
    return `/human-resources/human-resources-hours`;
  }
}
