import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import StyledRegistry from "@/lib/StyledComponents/StyledRegistry";
import FCThemeProvider from "@/lib/StyledComponents/FCThemeProvider";
import {ReactNode} from "react";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Finance Calendar',
    description: 'Update descriptions!',
}

type RootLayoutProps = {
    children: ReactNode
}

const RootLayout = ({children}: RootLayoutProps) => {
    return (
        <html lang="en">
        <body className={inter.className}>
        <StyledRegistry>
            <FCThemeProvider>
                {/*Main Content Area*/}
                <main>
                    {children}
                </main>
            </FCThemeProvider>
        </StyledRegistry>
        </body>
        </html>
    )
}

export default RootLayout;