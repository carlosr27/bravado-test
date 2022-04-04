// import colors from 'vuetify/lib/util/colors'

// const system = {
//   primary: {
//     base: 'red',
//   },
//   secondary: {
//     base: 'blue',
//   },
// }

// const infos = {
//   warning: colors.amber.base,
//   error: colors.deepOrange.accent4,
//   success: colors.green.accent3,
// }

export default function ({ app }) {
  return {
    breakpoint: {
      thresholds: {
        xs: 600,
        sm: 960,
        md: 1264,
        lg: 1404,
        xl: 1904,
        xxl: 2904,
      },
    },
    theme: {
      options: { customProperties: true },
      dark: false,
      // themes: {
      //   dark: { ...system, ...infos },
      //   light: { ...system, ...infos },
      // },
    },
  }
}
