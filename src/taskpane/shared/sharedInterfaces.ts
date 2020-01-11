export interface IFormState {

    // Fields tab
    dataSource: IDataSource,
    participantType: IOptions,
    dataCollection: IOptions,
    field: IField,
    ifNull: string,
    ignoreIfNull: boolean,
    recordNo: string,
    repeatrn: boolean,
    prefix: string,
    suffix: string,

    // Options tab
    useMailMergeFields: boolean,
    resetOnChange: boolean,
    case: IOptions,
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

export interface IOptions {
    key: string,
    text: string
}

export interface IDataSource extends IOptions {
    field: IField[]
}

interface IField extends IOptions {
    format: "s" | "d" | "c" | "n" | "p"
}