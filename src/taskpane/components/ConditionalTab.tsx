import * as React from 'react';
import { Stack, TextField, Checkbox, Dropdown, IDropdownOption, DefaultButton, IContextualMenuProps } from 'office-ui-fabric-react';
import { stackTokens } from '../common/tokens';
import { insertField } from '../common/officeAPI';
import { buildEndIf, buildIf, buildElse } from '../common/fieldBuilders';

interface IConditionalTab {
    handleChange: any,
    formState: any,
    resetConditional: any
}

export function ConditionalTab(props: IConditionalTab) {

    const { handleChange, formState, resetConditional } = props;
    
    const insertIfBlock = () => insertField(formState.useMailMergeFields, buildIf(formState, 'IF'), buildEndIf());
    const insertIf = () => insertField(formState.useMailMergeFields, buildIf(formState, 'IF'), undefined);
    const insertElseIf = () => insertField(formState.useMailMergeFields, buildIf(formState, 'ELSEIF'), buildEndIf());
    const insertElse = () => insertField(formState.useMailMergeFields, buildElse(), undefined);
    const insertEnd = () => insertField(formState.useMailMergeFields, buildEndIf(), undefined);

    const conditionalOperatorList: IDropdownOption[] = [
        { key: "==", text: "is equal to" },
        { key: "!=", text: "is not equal to" },
        { key: ">", text: "is greater than" },
        { key: ">=", text: "is greater than or equal to" },
        { key: "<", text: "is less than" },
        { key: "<=", text: "is less than or equal to" }
    ]

    const splitButtonItems: IContextualMenuProps = {
        items: [
            { 
                key: 'if',
                text: 'Insert IF start',
                onClick: insertIf
            },
            {
                key: 'elseif',
                text: 'Insert ELSE IF',
                onClick: insertElseIf
            },
            {
                key: 'else',
                text: 'Insert ELSE',
                onClick: insertElse
                
            },
            {
                key: 'end',
                text: 'Insert IF end',
                onClick: insertEnd
            },
            {
                key: 'copy',
                text: 'Copy to clipboard'
            },
            {
                key: 'resetConditional',
                text: 'Clear',
                onClick: resetConditional
            }
        ]
    }

    return (
        <div>
            <Stack tokens={stackTokens}>

                <Stack.Item>
                    <TextField id="condition1" 
                        label="Condition 1" 
                        onChange={handleChange} 
                        value={formState.condition1} />
                </Stack.Item>

                <Stack.Item>
                    <Checkbox id="condition1IsField" 
                        label="Is a field" 
                        onChange={handleChange} 
                        checked={formState.condition1IsField} />
                </Stack.Item>

                <Stack.Item>
                    <Dropdown id="conditionalOperator" 
                        label="Operator" 
                        selectedKey={formState.conditionalOperator ? formState.conditionalOperator.key : undefined} 
                        onChange={handleChange} 
                        placeholder="Select operator" 
                        options={conditionalOperatorList} />
                </Stack.Item>

                <Stack.Item>
                    <TextField id="condition2" 
                        label="Condition 2" 
                        onChange={handleChange} 
                        value={formState.condition2} />
                </Stack.Item>

                <Stack.Item>
                    <Checkbox id="condition2IsField" 
                        label="Is a field" 
                        onChange={handleChange} 
                        checked={formState.condition2IsField} />
                </Stack.Item>
                
                <Stack.Item align="center">
                    <DefaultButton 
                        text="Insert IF"
                        primary
                        split
                        splitButtonAriaLabel="More options"
                        menuProps={splitButtonItems}
                        onClick={insertIfBlock} />   
                </Stack.Item>

            </Stack>

        </div>
    )
}