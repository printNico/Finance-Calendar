export interface FCTheme {
    colors: {
        primary: string
        secondary: string
        noColor: string

        background1: string
        background2: string
        background3: string
    },
    breakpoints: {
        xs: string
        sm: string
        md: string
        lg: string
        xl: string
    }
}

declare module 'styled-components' {
    export interface DefaultTheme extends FCTheme {}
}