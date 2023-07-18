export type Entry = {
    id: string
    title: string
    color: string
    date: number
    amount: number
    action: EntryAction
    type: EntryType
    frequency: number
}

export enum EntryType {
    onetime = "One Time Payment",
    recurring = "Recurring Payment"
}

export enum EntryAction {
    additive = "Incoming",
    subtractive = "Outgoing"
}

export const ConvertKeyToValueEnum = (key: string, enumType: any) => {
    for (const value in enumType) {
        if (enumType[value] === key) return value;
    }
    return ""
}

export const ConvertValueToKeyEnum = (value: string, enumType: any) => {
    return enumType[value]
}