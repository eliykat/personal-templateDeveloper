import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Stack, IStackTokens, IStackStyles } from 'office-ui-fabric-react/lib/Stack';

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

    const stackTokens: IStackTokens = {
        childrenGap: 15,
        padding: 15
    }

    const insertButtonStyles: IStackStyles = {
        root: {
            justifyContent: 'flex-end'
        }
    }

    return (
        <Stack tokens={stackTokens} verticalFill={true}>

            {/* MAIN DROPDOWNS */}

            <Stack.Item>
                <Dropdown id="dataSource" 
                    label="Data Source" 
                    selectedKey={formState.dataSource ? formState.dataSource.key : undefined} 
                    onChange={handleChange} 
                    placeholder="Select a data source" 
                    options={dataSourceList} />
            </Stack.Item>

            <Stack.Item>
                { (formState.dataSource && (formState.dataSource.key == "Participant Data" || formState.dataSource.key == "Participant Data - System" )) && (
                <Dropdown id="participantType" 
                    label="Participant Type" 
                    selectedKey={formState.participantType ? formState.participantType.key : undefined} 
                    onChange={handleChange} 
                    placeholder="Select an option" 
                    options={participantTypeList} />
                )}
            </Stack.Item>

            <Stack.Item>
                { (formState.dataSource && formState.dataSource.key == "Custom Data") && (
                <Dropdown id="dataCollection" 
                    label="Custom Data Collection" 
                    selectedKey={formState.dataCollection ? formState.dataCollection.key : undefined} 
                    onChange={handleChange} 
                    placeholder="Select an option" 
                    options={dataCollectionList} />
                )}
            </Stack.Item>

            <Stack.Item>
                <Dropdown id="field" 
                    label="Field" 
                    selectedKey={formState.field ? formState.field.key : undefined} 
                    onChange={handleChange} 
                    placeholder="Select a field" 
                    options={formState.dataSource ? formState.dataSource.fields : undefined} />
            </Stack.Item>

            {/* OPTIONS */}

            <Stack.Item>
                <Checkbox id="ignoreIfNull" label="Ignore if null" onChange={handleChange} checked={formState.ignoreIfNull} />
            </Stack.Item>

            <Stack.Item>
                <Checkbox id="repeatrn" label="Inside REPEAT block" onChange={handleChange} checked={formState.repeatrn} />
            </Stack.Item>
            
            <Stack.Item>
                <TextField id="prefix" label="Prefix" onChange={handleChange} value={formState.prefix} />
            </Stack.Item>

            <Stack.Item>
                <TextField id="suffix" label="Suffix" onChange={handleChange} value={formState.suffix} />
            </Stack.Item>

            {/* BUTTONS */}
            <Stack verticalFill={true} styles={insertButtonStyles}>
                <Stack.Item align="center" >
                    <PrimaryButton text="Insert Field" onClick={insertField} />
                </Stack.Item>
            </Stack>

        </Stack>
    )
}