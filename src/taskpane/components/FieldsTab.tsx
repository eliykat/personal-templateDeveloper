import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

import * as dataSources from '../../json/static.json';
import { getParticipantTypes } from '../../Helpers/getParticipantTypes';
import { InsertButton } from './InsertButton';
import { stackTokens } from '../shared/sharedTokens';

// Required for checkboxes
initializeIcons();

interface IFieldsTab {
    handleChange: any,
    insertField: any,
    formState: any
}

export function FieldsTab(props: IFieldsTab) {

    const dataSourceList:IDropdownOption[] = dataSources.dataSources;
    const participantTypeList:IDropdownOption[] = getParticipantTypes();   // API call
    const dataCollectionList:IDropdownOption[] = [];

    const { handleChange, insertField, formState } = props;

    return (
        <div>
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

                { (formState.dataSource && (formState.dataSource.key == "Participant Data" || formState.dataSource.key == "Participant Data - System" )) && (
                <Stack.Item>
                    <Dropdown id="participantType" 
                        label="Participant Type" 
                        selectedKey={formState.participantType ? formState.participantType.key : undefined} 
                        onChange={handleChange} 
                        placeholder="Select an option" 
                        options={participantTypeList} />
                </Stack.Item>
                )}

                { (formState.dataSource && formState.dataSource.key == "Custom Data") && (
                <Stack.Item>
                    
                    <Dropdown id="dataCollection" 
                        label="Custom Data Collection" 
                        selectedKey={formState.dataCollection ? formState.dataCollection.key : undefined} 
                        onChange={handleChange} 
                        placeholder="Select an option" 
                        options={dataCollectionList} />
                </Stack.Item>                    
                )}

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

            </Stack>

            <InsertButton insertField={insertField} />

        </div>

    )
}