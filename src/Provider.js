/* eslint-disable react/prop-types */
import React from "react"
import { shallowEqual } from "./utils/utils"

export const MobXProviderContext = React.createContext({})

export function Provider({ children, ...stores }) {
    const parentValue = React.useContext(MobXProviderContext)
    const value = React.useRef({
        ...parentValue,
        ...stores
    }).current

    if (process && typeof process.env !== "undefined" && process.env.NODE_ENV !== "production") {
        const newValue = { ...value, ...stores } // spread in previous state for the context based stores
        if (!shallowEqual(value, newValue)) {
            throw new Error(
                "MobX Provider: The set of provided stores has changed. See: https://github.com/mobxjs/mobx-react#the-set-of-provided-stores-has-changed-error."
            )
        }
    }

    return <MobXProviderContext.Provider value={value}>{children}</MobXProviderContext.Provider>
}

Provider.displayName = "MobXProvider"
