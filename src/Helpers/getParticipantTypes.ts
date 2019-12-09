// Imitates an API call to the participanttypes resource and transforms the result into the format required by IDropdownOption
import * as json from '../json/ParticipantTypes.json';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

interface IParticipantTypes {
    name: string
}

export function getParticipantTypes() {

    const participantTypes: IParticipantTypes[] = json.participanttypes;

    const transformed: IDropdownOption[] = participantTypes.map(
        (val) => {return {key: val.name, text: val.name} }
    )

    return transformed;
}