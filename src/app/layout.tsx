import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import StyledComponentsRegistry from "@/lib/StyledComponents/StyledComponentsRegistry";
import FCThemeProvider from "@/lib/StyledComponents/FCThemeProvider";
import {ReactNode} from "react";
import FCGlobalStyle from "@/lib/StyledComponents/FCGlobalStyle";
import TimeSelectionProvider from "@/lib/Calendar/TimeSelectionProvider";

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
        <StyledComponentsRegistry>
            <FCThemeProvider>
                <FCGlobalStyle/>
                <TimeSelectionProvider>
                    {/*Main Content Area*/}
                    <main>
                        {children}
                    </main>
                </TimeSelectionProvider>
            </FCThemeProvider>
        </StyledComponentsRegistry>
        </body>
        </html>
    )
}

export default RootLayout;