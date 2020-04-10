import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

import { InsertButton } from './InsertButton';
import { stackTokens } from '../common/tokens';
import { IDataSource } from '../common/interfaces';
import { compileParticipantsList, compileDataSourceList } from '../common/miscFunctions';
import { Separator } from 'office-ui-fabric-react';

// Required for checkboxes
initializeIcons();

interface IFieldsTab {
    handleChange: any,
    insertFieldBtn: any,
    formState: any,
    handleChangeNumbersOnly: any
    handleChangeReplaceSpaces: any
} 

export function FieldsTab(props: IFieldsTab) {

    const dataSourceList:IDataSource[] = compileDataSourceList();
    const participantTypeList:IDropdownOption[] = compileParticipantsList();

    const { handleChange, insertFieldBtn, formState, handleChangeNumbersOnly, handleChangeReplaceSpaces } = props;

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
                        disabled={(!formState.dataSource || !(formState.dataSource.key == "Participant Data"))} />
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
                    <Separator>Quick options</Separator>
                </Stack.Item>


                <Stack.Item>
                    <TextField id="ifNull" 
                        label="If null" 
                        onChange={handleChangeReplaceSpaces} 
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
                        onChange={handleChangeNumbersOnly} 
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
                        onChange={handleChangeReplaceSpaces} 
                        value={formState.prefix} />
                </Stack.Item>

                <Stack.Item>
                    <TextField id="suffix" 
                        label="Suffix" 
                        onChange={handleChangeReplaceSpaces} 
                        value={formState.suffix} />
                </Stack.Item>

            </Stack>

            <InsertButton handleClick={insertFieldBtn} buttonText="Insert Field" />

        </div>

    )
}