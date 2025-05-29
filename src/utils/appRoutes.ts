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
  static users() {
    return `/users`
  }

  // cash flow
  static cashFlow() {
    return `/cash-flow/simulate`
  }
  static championCattle() {
    return `/cash-flow/champion-cattle`
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

  // freights
  static freights() {
    return `/freights`
  }
  static cattlePurchaseFreights() {
    return `/freights/cattle-purchase-freights`
  }
}
