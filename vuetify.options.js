export default function ({ app }) {
  return {
    breakpoint: {
      thresholds: {
        xs: 580,
        sm: 960,
        md: 1264,
        lg: 1404,
        xl: 1904,
        xxl: 2904,
      },
    },
    theme: { disable: true },
  }
}
