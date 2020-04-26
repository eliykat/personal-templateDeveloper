import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Stack, IStackItemStyles } from 'office-ui-fabric-react/lib/Stack';

import { DefaultButton, IContextualMenuProps, TextField, DetailsList } from 'office-ui-fabric-react';
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

    const { handleChange, formState, insertFieldBtn, resetOptions,
        copyCondition1, copyCondition2, handleChangeReplaceSpaces, handleFieldChange } = props;

    const insertRepeatBlock = () => insertField(formState.useMailMergeFields, buildRepeat(formState), buildRepeatEnd());

    const insertRepeat = () => insertField(formState.useMailMergeFields, buildRepeat(formState), undefined);

    const insertEndRepeat = () => insertField(formState.useMailMergeFields, buildRepeatEnd(), undefined);

    const customDataSelected = () => formState.dataSource && formState.dataSource.key == "Custom Data";

    const repeatIsValid = () => {
        return formState.dataSource &&
            (formState.dataSource.key == "Sale/Purchase Line Item Data" || formState.dataSource.key == "Participant Data" ||
            formState.dataSource.key == "Custom Data")
    }

    const [getFilteredFields, setFilteredFields] = useState([]);

    const [getFilter, setFilter] = useState("");

    useEffect(() => {
        setFilter("");
        formState.dataSource ? setFilteredFields(formState.dataSource.fields) : [];
    }, [formState.dataSource])

    const fieldButtonItems: IContextualMenuProps = {
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
            }
        ]
    }

    const repeatButtonItems: IContextualMenuProps = {
        items: [
            {
                key: 'repeat',
                text: 'Insert REPEAT only',
                onClick: insertRepeat,
                disabled: !repeatIsValid()
            },
            {
                key: 'repeatend',
                text: 'Insert REPEAT END',
                onClick: insertEndRepeat
            }
        ]
    }

    const columns = [
        { key: 'column1', name: 'Field name', fieldName: 'text', minWidth: 100, maxWidth: 200 }
      ];

    const onFilter = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, query: string): void => {
        
        setFilter(query);

        setFilteredFields(
          query ? formState.dataSource.fields.filter(i => i.text.toLowerCase().indexOf(query.toLowerCase()) > -1) : formState.dataSource.fields
        );
    }

    const detailsListStackStyles: IStackItemStyles = {
        root: [
            {
                overflow: 'auto', 
                height: '400px'
            }
        ]
    }

    return (
        <div>

            <Stack tokens={stackTokens} verticalFill={true}>

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
                    <TextField
                        label="Filter fields by name:"
                        onChange={onFilter}
                        value={getFilter} 
                        disabled={!formState.dataSource}/>
                </Stack.Item>

                {!customDataSelected() && 
                <Stack.Item styles={detailsListStackStyles}>
                    <DetailsList
                        items={formState.dataSource ? getFilteredFields : [] }
                        columns={columns}
                        selectionPreservedOnEmptyClick={true}
                        selectionMode={1}
                        onActiveItemChanged={handleFieldChange}
                        compact={true}
                        checkboxVisibility={2}
                    />
                </Stack.Item>
                }

                {customDataSelected() &&
                <Stack.Item>
                    <TextField id="customField"
                        label="Custom Data Field"
                        placeholder="Enter custom data field code"
                        onChange={handleChangeReplaceSpaces}
                        value={formState.customField}
                    />
                </Stack.Item>
                }

                <Stack.Item align="center">
                    <DefaultButton 
                        text="Insert REPEAT block"
                        split
                        splitButtonAriaLabel="More REPEAT options"
                        menuProps={repeatButtonItems}
                        onClick={insertRepeatBlock}
                        primaryDisabled={!repeatIsValid()} />
                </Stack.Item>

                <Stack.Item align="center">
                    <DefaultButton 
                        text="Insert field"
                        primary
                        split
                        splitButtonAriaLabel="More field options"
                        menuProps={fieldButtonItems}
                        onClick={insertFieldBtn} />
                </Stack.Item>

            </Stack>
        </div>

    )
}