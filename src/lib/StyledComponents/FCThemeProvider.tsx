"use client"

import {FCTheme} from "@/lib/StyledComponents/types/FCTheme";
import {ReactNode} from "react";
import {ThemeProvider} from "styled-components";

const darkTheme: FCTheme = {
    colors: {
        primary: '#a7b812',
        secondary: '#088985',
        noColor: '#aaaaaa',

        background1: '#141432',
        background2: '#1f1f3e',
        background3: '#2a2a54'
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
        primary: '#a7b812',
        secondary: '#088985',
        noColor: '#aaaaaa',

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