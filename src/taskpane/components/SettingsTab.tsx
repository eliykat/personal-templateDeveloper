import * as React from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

import { stackTokens } from '../common/tokens';
import { Stack } from 'office-ui-fabric-react';
import { dateFormatList, phoneFormatList } from '../common/dropdownOptions';

// Required for checkboxes
initializeIcons();

interface ISettingsTab {
    handleChange: any,
    formState: any,
}

export function SettingsTab (props: ISettingsTab) {
        
    const { handleChange, formState } = props;

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

            </Stack>

        </div>
    )
}