// Imitates an API call to the actiontypes resource and transforms the result into the format required by IDropdownOption
import * as json from '../json/actionTypes.json';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

interface IActionTypes {
    name: string
}

export function getActionTypes() {

    const actionTypes: IActionTypes[] = json.actiontypes;

    const transformed: IDropdownOption[] = actionTypes.map(
        (val) => {return {key: val.name, text: val.name} }
    )

    return transformed;
}