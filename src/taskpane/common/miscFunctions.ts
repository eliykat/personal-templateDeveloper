import { IDropdownOption, DropdownMenuItemType } from "office-ui-fabric-react";
import { getParticipantTypes } from "./getParticipantTypes";
import * as systemParticipantTypesjson from "../../json/StaticParticipantTypes.json";
import * as dataSourcejson from '../../json/static.json';
import { IDataSource } from "./interfaces";

export function replaceSpaces(string: string): string {
    return string.replace(/ /g, '_');
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

export function compileDataSourceList(): IDataSource[] {
    dataSourcejson.dataSources.forEach(dataSource => {
        if (dataSource.key == "Participant Data") {
            dataSource.fields = dataSource.fields.map(field => {
                if (field.format == "h") {
                    return { key: field.key, text: field.text, format: "h", itemType: DropdownMenuItemType.Header };
                } else {
                    return field;
                }})
        }
    })

    const dataSourceList: IDataSource[] = dataSourcejson.dataSources as IDataSource[]

    // Hack to copy Participant Data fields to Participant Data (custom type) fields
    // Assumes that the latter immediately follows the former
    for (let i=0; i<dataSourceList.length; i++) {
        if (dataSourceList[i].key == "Participant Data (custom type)") {
            dataSourceList[i].fields = dataSourceList[i-1].fields
        }
    }

    return dataSourceList;
}