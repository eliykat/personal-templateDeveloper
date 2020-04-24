import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

import { stackTokens, stackStyles } from '../common/tokens';
import { Stack, DefaultButton, IContextualMenuProps } from 'office-ui-fabric-react';
import { caseList, newLineList } from '../common/dropdownOptions';

// Required for checkboxes
initializeIcons();

interface IOptionsTab {
    handleChange: any,
    insertFieldBtn: any,
    formState: any,
    handleChangeReplaceSpaces: any,
    handleChangeNumbersOnly: any,
    resetOptions: any,
}

export function OptionsTab (props: IOptionsTab) {
        
    const { handleChange, formState, handleChangeReplaceSpaces, handleChangeNumbersOnly, resetOptions, insertFieldBtn } = props;

    const splitButtonItems: IContextualMenuProps = {
        items: [
            {
                key: 'copy',
                text: 'Copy to clipboard'
            },
            {
                key: 'resetOptions',
                text: 'Clear options',
                onClick: resetOptions
            }
        ]
    }

    return (
        <div>
            <Stack tokens={stackTokens} verticalFill={true} styles={stackStyles}>

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

                <Stack.Item>                    
                    <Dropdown id="case" 
                        selectedKey={formState.case ? formState.case.key : undefined }
                        options={caseList} 
                        onChange={handleChange}
                        label="Case" />
                </Stack.Item>
                
                <Stack.Item>
                    <Dropdown id="newLine" 
                        label="New Line" 
                        selectedKey={formState.newLine ? formState.newLine.key : undefined} 
                        onChange={handleChange} 
                        placeholder="Select new lines to insert around field" 
                        options={newLineList} />
                </Stack.Item>

                <Stack.Item>
                    <Checkbox id="stripSpaces" 
                        label="Strip spaces" 
                        onChange={handleChange} 
                        checked={formState.stripSpaces} />
                </Stack.Item>

                <Stack.Item>
                    <Checkbox id="currencyToWords" 
                        label="Convert currency field to words" 
                        onChange={handleChange} 
                        checked={formState.currencyToWords} />
                </Stack.Item>

                <Stack.Item>
                    <Checkbox id="noCurrencySymbol" 
                        label="Remove currency symbol" 
                        onChange={handleChange} 
                        checked={formState.noCurrencySymbol} />
                </Stack.Item>

                <Stack.Item>
                    <TextField id="customOption" 
                        label="Custom option" 
                        onChange={handleChangeReplaceSpaces} 
                        value={formState.customOption} />
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