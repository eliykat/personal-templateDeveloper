import * as React from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

import { InsertButton } from './InsertButton';
import { stackTokens } from '../common/tokens';
import { IDataSource } from '../common/interfaces';
import { compileParticipantsList, compileDataSourceList } from '../common/miscFunctions';

// Required for checkboxes
initializeIcons();

interface IFieldsTab {
    handleChange: any,
    insertFieldBtn: any,
    formState: any,
    handleChangeNumbersOnly: any,
    handleChangeReplaceSpaces: any,
    handleFieldChange: any
}

export function FieldsTab(props: IFieldsTab) {

    const dataSourceList:IDataSource[] = compileDataSourceList();
    const participantTypeList:IDropdownOption[] = compileParticipantsList();

    const { handleChange, insertFieldBtn, formState, handleFieldChange } = props;

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
                        onChange={handleFieldChange} 
                        placeholder="Select a field" 
                        options={formState.dataSource ? formState.dataSource.fields : undefined} />
                </Stack.Item>

            </Stack>

            <InsertButton handleClick={insertFieldBtn} buttonText="Insert Field" />

        </div>

    )
}