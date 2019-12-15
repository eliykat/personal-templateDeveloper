import { IChoiceGroupOption } from "office-ui-fabric-react";

export interface IFormState {

    // Fields tab
    dataSource: IDataSource,
    participantType: IOptions,
    dataCollection: IOptions,
    field: IField,
    ignoreIfNull: boolean,
    repeatrn: boolean,
    prefix: string,
    suffix: string,

    // Options tab
    actionType: IOptions,
    useMailMergeFields: boolean,
    resetOnChange: boolean,
    case: IChoiceGroupOption,
    dateFormat: IOptions,
    phoneFormat: IOptions,
    newLine: IOptions,
    currencyToWords: boolean,
    noCurrencySymbol: boolean,
    customOption: string,

    // Conditional tab
    condition1: string,
    condition1IsField: boolean,
    conditionalOperator: IOptions,
    condition2: string,
    condition2IsField: boolean
}

interface IOptions {
    key: string,
    text: string
}

interface IDataSource extends IOptions {
    field: IField[]
}

interface IField extends IOptions {
    format: "s" | "d" | "c" | "n" | "p"
}