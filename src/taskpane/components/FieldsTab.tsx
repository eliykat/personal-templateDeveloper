import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

import * as dataSources from '../../json/static.json';
import { getParticipantTypes } from '../../Helpers/getParticipantTypes';

// Required for checkboxes
initializeIcons();

export function FieldsTab(props) {

    const dataSourceList:IDropdownOption[] = dataSources.dataSources;
    const participantTypeList:IDropdownOption[] = getParticipantTypes();   // API call
    const dataCollectionList:IDropdownOption[] = [];

    const handleChange = props.handleChange;
    const insertField = props.insertField;
    const formState = props.formState;       

    return (
        <div>

            {/* MAIN DROPDOWNS */}

            <Dropdown id="dataSource" 
                label="Data Source" 
                selectedKey={formState.dataSource ? formState.dataSource.key : undefined} 
                onChange={handleChange} 
                placeholder="Select a data source" 
                options={dataSourceList} />

            { (formState.dataSource && (formState.dataSource.key == "Participant Data" || formState.dataSource.key == "Participant Data - System" )) && (
            <Dropdown id="participantType" 
                label="Participant Type" 
                selectedKey={formState.participantType ? formState.participantType.key : undefined} 
                onChange={handleChange} 
                placeholder="Select an option" 
                options={participantTypeList} />
            )}

            { (formState.dataSource && formState.dataSource.key == "Custom Data") && (
            <Dropdown id="dataCollection" 
                label="Custom Data Collection" 
                selectedKey={formState.dataCollection ? formState.dataCollection.key : undefined} 
                onChange={handleChange} 
                placeholder="Select an option" 
                options={dataCollectionList} />
            )}

            <Dropdown id="field" 
                label="Field" 
                selectedKey={formState.field ? formState.field.key : undefined} 
                onChange={handleChange} 
                placeholder="Select a field" 
                options={formState.dataSource ? formState.dataSource.fields : undefined} />

            {/* OPTIONS */}

            <Checkbox id="ignoreIfNull" label="Ignore if null" onChange={handleChange} checked={formState.ignoreIfNull} />
            <Checkbox id="repeatrn" label="Inside REPEAT block" onChange={handleChange} checked={formState.repeatrn} />
            <TextField id="prefix" label="Prefix" onChange={handleChange} value={formState.prefix} />
            <TextField id="suffix" label="Suffix" onChange={handleChange} value={formState.suffix} />

            {/* BUTTONS */}

            <PrimaryButton text="Insert Field" onClick={insertField} />

        </div>
    )
}