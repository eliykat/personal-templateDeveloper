import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

import { stackTokens } from '../common/tokens';
import { Stack } from 'office-ui-fabric-react';
import { InsertButton } from './InsertButton';
import { caseList, dateFormatList, newLineList, phoneFormatList } from '../common/dropdownOptions';

// Required for checkboxes
initializeIcons();

interface IOptionsTab {
    handleChange: any,
    insertFieldBtn: any,
    formState: any
}

export function OptionsTab (props: IOptionsTab) {
        
    const { handleChange, insertFieldBtn, formState } = props;

    return (
        <div>
            <Stack tokens={stackTokens} verticalFill={true}>

                <Stack.Item>
                    <Checkbox id="useMailMergeFields" 
                        label="Use mail merge fields instead of square brackets" 
                        onChange={handleChange} 
                        checked={formState.useMailMergeFields} />
                </Stack.Item>

                <Stack.Item>
                    <Checkbox id="resetOnChange" 
                        label="Reset options when a different field is selected" 
                        onChange={handleChange} 
                        checked={formState.resetOnChange} />
                </Stack.Item>

                <Stack.Item>                    
                    <Dropdown id="case" 
                        selectedKey={formState.case ? formState.case.key : undefined }
                        options={caseList} 
                        onChange={handleChange}
                        label="Case" />
                </Stack.Item>

                <Stack.Item>
                    <Dropdown id="dateFormat" 
                        label="Date Format" 
                        selectedKey={formState.dateFormat ? formState.dateFormat.key : undefined} 
                        onChange={handleChange} 
                        placeholder="Select date format" 
                        options={dateFormatList} />
                </Stack.Item>

                <Stack.Item>
                    <Dropdown id="phoneFormat" 
                        label="Phone number format" 
                        selectedKey={formState.phoneFormat ? formState.phoneFormat.key : undefined} 
                        onChange={handleChange} 
                        placeholder="Select phone number format" 
                        options={phoneFormatList} />
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
                        onChange={handleChange} 
                        value={formState.prefix} />
                </Stack.Item>
            </Stack>

            <InsertButton handleClick={insertFieldBtn} buttonText="Insert Field" />

        </div>
    )
}