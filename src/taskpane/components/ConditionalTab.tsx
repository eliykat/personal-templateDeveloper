import * as React from 'react';
import { Stack, TextField, Checkbox, Dropdown, IDropdownOption } from 'office-ui-fabric-react';
import { stackTokens } from '../shared/sharedTokens';
import { InsertButton } from './InsertButton';

function insertConditional(formState) {
    
}

export function ConditionalTab(props) {

    const { handleChange, formState } = props;

    const conditionalOperatorList: IDropdownOption[] = [
        { key: "==", text: "is equal to" },
        { key: "!=", text: "is not equal to" },
        { key: ">", text: "is greater than" },
        { key: ">=", text: "is greater than or equal to" },
        { key: "<", text: "is less than" },
        { key: "<=", text: "is less than or equal to" }
    ]

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
                
            </Stack>

            <InsertButton insertField={insertConditional} />

        </div>
    )
}