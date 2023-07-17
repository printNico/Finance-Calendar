"use client"

import {ReactNode} from "react";
import {ThemeProvider} from "styled-components";

export interface FCTheme {
    colors: {
        primary: string
        secondary: string
    }
}

declare module 'styled-components' {
    export interface DefaultTheme extends FCTheme {}
}

const darkTheme: FCTheme = {
    colors: {
        primary: '#ff0000',
        secondary: '#00ff00'
    }
}

const lightTheme: FCTheme = {
    colors: {
        primary: '#0000ff',
        secondary: '#ff00ff'
    }
}

type FCThemeProviderProps = {
    children?: ReactNode
}

const FCThemeProvider = (props: FCThemeProviderProps) => {
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                {props.children}
            </ThemeProvider>
        </>
    )
}

export default FCThemeProvider;