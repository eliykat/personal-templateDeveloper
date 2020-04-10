import { IDropdownOption, DropdownMenuItemType } from "office-ui-fabric-react";
import { getParticipantTypes } from "./getParticipantTypes";
import * as systemParticipantTypesjson from "../../json/StaticParticipantTypes.json";
import { IDataSource, IField } from "./interfaces";

export function replaceSpaces(string: string): string {
    return string.replace(/ /g, '_');
}

export function replaceUnderscores(string: string): string {
    return string.replace(/_/g, ' ');
}

export function compileParticipantsList(): IDropdownOption[] {
   
    const userParticipantTypes = getParticipantTypes();
    const systemParticipantTypes = systemParticipantTypesjson.staticparticipanttypes;

    const systemHeader: IDropdownOption[] = [
        { key: 'systemDivider', text: '-', itemType: DropdownMenuItemType.Divider},
        { key: 'systemHeader', text: 'System Participant Types', itemType: DropdownMenuItemType.Header }
    ]

    const userHeader: IDropdownOption[] = [
        { key: 'userHeader', text: 'User Participant Types', itemType: DropdownMenuItemType.Header }
    ]

    const allParticipantTypes = userHeader.concat(userParticipantTypes, systemHeader, systemParticipantTypes);

    return allParticipantTypes;
}

export function insertDropdownHeader(dataSourceList: IDataSource[]): IDataSource[] {
    dataSourceList.forEach(dataSource => {
        if (dataSource.key = "Participant Data") {
            dataSource.fields = dataSource.fields.map(field => {
                if (field.format == "h") {
                    return { key: field.key, text: field.text, format: "h", itemType: DropdownMenuItemType.Header };
                } else {
                    return field;
                }})
        }
    })

    return dataSourceList;
}