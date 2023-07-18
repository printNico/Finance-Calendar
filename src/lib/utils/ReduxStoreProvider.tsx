"use client"

import {ReactNode} from "react";
import {Provider} from "react-redux";
import {store} from "@/store/store";

type ReduxStoreProviderProps = {
    children?: ReactNode;
}

const ReduxStoreProvider = (props: ReduxStoreProviderProps) => {
    return (
        <>
            <Provider store={store}>
                {props.children}
            </Provider>
        </>
    )
}

export default ReduxStoreProvider;