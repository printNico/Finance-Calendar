"use client"

import {ReactNode} from "react";
import {ThemeProvider} from "styled-components";

export interface FCTheme {
    colors: {
        primary: string
        secondary: string

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

const darkTheme: FCTheme = {
    colors: {
        primary: '#ff0000',
        secondary: '#00ff00',

        background1: '#000000',
        background2: '#111111',
        background3: '#222222'
    },
    breakpoints: {
        xs: '0px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px'
    }
}

const lightTheme: FCTheme = {
    colors: {
        primary: '#0000ff',
        secondary: '#ff00ff',

        background1: '#ffffff',
        background2: '#eeeeee',
        background3: '#dddddd'
    },
    breakpoints: {
        xs: '0px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px'
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