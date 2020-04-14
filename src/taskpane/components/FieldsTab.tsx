import * as React from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

import { DefaultButton, IContextualMenuProps } from 'office-ui-fabric-react';
import { stackTokens } from '../common/tokens';
import { IDataSource } from '../common/interfaces';
import { compileParticipantsList, compileDataSourceList } from '../common/miscFunctions';
import { buildRepeat, buildRepeatEnd } from '../common/fieldBuilders';
import { insertField } from '../common/officeAPI';

// Required for checkboxes
initializeIcons();

interface IFieldsTab {
    handleChange: any,
    insertFieldBtn: any,
    formState: any,
    handleChangeNumbersOnly: any,
    handleChangeReplaceSpaces: any,
    handleFieldChange: any,
    resetOptions: any,
    copyCondition1: any,
    copyCondition2: any
}

export function FieldsTab(props: IFieldsTab) {

    const dataSourceList:IDataSource[] = compileDataSourceList();
    const participantTypeList:IDropdownOption[] = compileParticipantsList();

    const { handleChange, formState, handleFieldChange, insertFieldBtn, resetOptions,
        copyCondition1, copyCondition2 } = props;

    const insertRepeatBlock = () => insertField(formState.useMailMergeFields, buildRepeat(formState), buildRepeatEnd());

    const insertRepeat = () => insertField(formState.useMailMergeFields, buildRepeat(formState), undefined);

    const insertEndRepeat = () => insertField(formState.useMailMergeFields, buildRepeatEnd(), undefined);

    const splitButtonItems: IContextualMenuProps = {
        items: [
            {
                key: 'copy',
                text: 'Copy to clipboard'
            },
            {
                key: 'copyCondition1',
                text: 'Copy to condition 1',
                onClick: copyCondition1
            },
            {
                key: 'copyCondition2',
                text: 'Copy to condition 2',
                onClick: copyCondition2
            },
            {
                key: 'resetOptions',
                text: 'Clear options',
                onClick: resetOptions
            },
            {
                key: 'repeatBlock',
                text: 'Insert REPEAT block',
                disabled: !formState.dataSource ||
                    !(formState.dataSource.key == "Sale/Purchase Line Item Data" || formState.dataSource.key == "Participant Data"),
                onClick: insertRepeatBlock
            },
            {
                key: 'repeat',
                text: 'Insert REPEAT only',
                disabled: !formState.dataSource ||
                    !(formState.dataSource.key == "Sale/Purchase Line Item Data" || formState.dataSource.key == "Participant Data"),
                onClick: insertRepeat
            },
            {
                key: 'repeatend',
                text: 'Insert REPEAT END',
                onClick: insertEndRepeat
            }
        ]
    }

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
                        disabled={!formState.dataSource || !(formState.dataSource.key == "Participant Data")} />
                </Stack.Item>

                <Stack.Item>
                    <Dropdown id="field" 
                        label="Field" 
                        selectedKey={formState.field ? formState.field.key : undefined} 
                        onChange={handleFieldChange} 
                        placeholder="Select a field" 
                        options={formState.dataSource ? formState.dataSource.fields : undefined} />
                </Stack.Item>

                <Stack.Item align="center">
                    <DefaultButton 
                        text="Insert"
                        primary
                        split
                        splitButtonAriaLabel="More options"
                        menuProps={splitButtonItems}
                        onClick={insertFieldBtn} />
                </Stack.Item>

            </Stack>
        </div>

    )
}