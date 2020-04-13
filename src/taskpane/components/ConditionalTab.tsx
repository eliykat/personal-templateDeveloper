import * as React from 'react';
import { Stack, TextField, Checkbox, Dropdown, IDropdownOption, DefaultButton, IContextualMenuProps } from 'office-ui-fabric-react';
import { stackTokens } from '../common/tokens';

interface IConditionalTab {
    handleChange: any,
    insertConditionalBtn: any,
    formState: any,
    resetConditional: any
}

export function ConditionalTab(props: IConditionalTab) {

    const { handleChange, formState, resetConditional } = props;

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
                key: 'ifelse',
                text: 'Insert IF ELSE'
            },
            {
                key: 'else',
                text: 'Insert ELSE'
            },
            {
                key: 'end',
                text: 'Insert IF END'
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
                        text="Insert IF block"
                        primary
                        split
                        splitButtonAriaLabel="More options"
                        menuProps={splitButtonItems}
                        // TO IMPLEMENT ONCLICK
                        onClick={() => {}} />   
                </Stack.Item>

            </Stack>

        </div>
    )
}