import { IDropdownOption, DropdownMenuItemType } from "office-ui-fabric-react";
import { getParticipantTypes } from "../../Helpers/getParticipantTypes";
import * as systemParticipantTypesjson from "../../json/StaticParticipantTypes.json";

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