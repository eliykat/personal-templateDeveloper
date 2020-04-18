export interface IFormState extends IFieldsState, IOptionsState, ISettingsState, IConditionalState {}

export interface IFieldsState {
    dataSource: IDataSource,
    participantType: IOptions,
    dataCollection: IOptions,
    field: IField,
    customField: string
}

export interface IOptionsState {
    ifNull: string,
    ignoreIfNull: boolean,
    recordNo: string,
    repeatrn: boolean,
    prefix: string,
    suffix: string,
    case: IOptions,
    newLine: IOptions,
    currencyToWords: boolean,
    noCurrencySymbol: boolean,
    customOption: string,
    stripSpaces: boolean
}

export interface ISettingsState {
    useMailMergeFields: boolean,
    resetOnChange: boolean,
    dateFormat: IOptions,
    phoneFormat: IOptions
}

export interface IConditionalState {
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
    fields: IField[]
}

type formatTypes = 's' | 'd' | 'c' | 'n' | 'p' | 'h';

// represents a field in the dropdown interface
export interface IField extends IOptions {
    format: formatTypes
}

// represents an actionstep mergefield for insertion into the document
export interface IASField {
    code: string,
    label: string
}