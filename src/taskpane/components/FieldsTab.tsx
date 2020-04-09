import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

import * as dataSources from '../../json/static.json';
import { InsertButton } from './InsertButton';
import { stackTokens } from '../common/tokens';
import { IDataSource } from '../common/interfaces';
import { compileParticipantsList } from '../common/miscFunctions';

// Required for checkboxes
initializeIcons();

interface IFieldsTab {
    handleChange: any,
    insertFieldBtn: any,
    formState: any,
    handleChangeRestricted: any
} 

export function FieldsTab(props: IFieldsTab) {

    const dataSourceList:IDataSource[] = dataSources.dataSources;
    const participantTypeList:IDropdownOption[] = compileParticipantsList();

    const { handleChange, insertFieldBtn, formState, handleChangeRestricted } = props;

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

                <Stack.Item>
                    <Dropdown id="participantType" 
                        label="Participant Type" 
                        selectedKey={formState.participantType ? formState.participantType.key : undefined} 
                        onChange={handleChange} 
                        placeholder="Select an option" 
                        options={participantTypeList}
                        disabled={(!formState.dataSource || !(formState.dataSource.key == "Participant Data" || formState.dataSource.key == "Participant Data - System" ))} />
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
                    <TextField id="ifNull" 
                        label="If null" 
                        onChange={handleChange} 
                        disabled={formState.ignoreIfNull} 
                        value={formState.ifNull} />
                </Stack.Item>

                <Stack.Item>
                    <Checkbox id="ignoreIfNull" 
                        label="Ignore if null" 
                        onChange={handleChange} 
                        checked={formState.ignoreIfNull} />
                </Stack.Item>

                <Stack.Item>
                    <TextField id="recordNo" 
                        label="Record number (inside REPEAT block)" 
                        onChange={handleChangeRestricted} 
                        disabled={formState.repeatrn} 
                        value={formState.recordNo} />
                </Stack.Item>

                <Stack.Item>
                    <Checkbox id="repeatrn" 
                        label="Repeat record (inside REPEAT block)" 
                        onChange={handleChange} 
                        checked={formState.repeatrn} />
                </Stack.Item>
                
                <Stack.Item>
                    <TextField id="prefix" 
                        label="Prefix" 
                        onChange={handleChange} 
                        value={formState.prefix} />
                </Stack.Item>

                <Stack.Item>
                    <TextField id="suffix" 
                        label="Suffix" 
                        onChange={handleChange} 
                        value={formState.suffix} />
                </Stack.Item>

            </Stack>

            <InsertButton handleClick={insertFieldBtn} buttonText="Insert Field" />

        </div>

    )
}