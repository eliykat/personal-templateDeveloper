import { IOptions } from './interfaces';

export const defaultNewLine: IOptions = { key: "na", text: "Not applicable" };

export const newLineList: IOptions[] = [
    defaultNewLine,
    { key: "before", text: "1 line before" },
    { key: "2before", text: "2 lines before" },
    { key: "after", text: "1 line after" },
    { key: "2after", text: "2 lines after" },
    { key: "both", text: "1 line before & after" },
    { key: "2both", text: "2 lines before & after" }
];

export const defaultDateFormat: IOptions = { key: "na", text: "Use system format (Default)" };

export const dateFormatList: IOptions[] = [
    defaultDateFormat,
    { key: "%A, %-e_%B_%Y", text: "Monday, 1 January 1990" },
    { key: "%-e_%B_%Y", text: "1 January 1990" },
    { key: "%-e_%b_%Y", text: "1 Jan 1990" },
    { key: "%nth_day_of_%B_%Y", text: "1st day of January 1990" },
    { key: "%d/%m/%Y", text: "01/01/1990" },
    { key: "%d/%m/%y", text: "01/01/90" },
    { key: "%-e/%-m/%Y", text: "1/1/1990" },
    { key: "%-e/%-m/%y", text: "1/1/90" },
    { key: "description", text: "Date memo" }
];

export const defaultPhoneFormat: IOptions = {key: "na", text: "+64 (21) 555 1212 (Default)"};

export const phoneFormatList: IOptions[] = [
    defaultPhoneFormat,
    {key: "a", text: "64 21 555 1212" },
    {key: "c", text: "(021) 555 1212"},
    {key: "d", text: "021 555 1212"},
    {key: "e", text: "(21) 555 1212"},
    {key: "f", text: "21 555 1212"}
];

export const defaultCase: IOptions = { key: "na", text: "No change" };

export const caseList: IOptions[] = [
    defaultCase,
    { key: "uclowerwords", text: "Title Case" },
    { key: "upper", text: "UPPER CASE" },
    { key: "lower", text: "lower case" },
]