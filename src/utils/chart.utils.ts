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

export const generateRandomColors = (count: number): string[] => {
  const colors: string[] = []

  for (let i = 0; i < count; i++) {
    const hue = Math.floor(Math.random() * 360) // 0 a 359
    const saturation = 70 + Math.floor(Math.random() * 20) // 70–90%
    const lightness = 50 + Math.floor(Math.random() * 10) // 50–60%

    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`)
  }

  return colors
}
