export const getChartWidth = (width: number) => {
  if (width >= 1500) {
    return 520
    // xl
  } else if (width < 1500 && width >= 1200) {
    return 800
    // lg
  } else if (width < 1200 && width >= 900) {
    return 800
    // md
  } else {
    return 380
    // xs
  }
}
