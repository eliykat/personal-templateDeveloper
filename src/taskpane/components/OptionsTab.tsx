import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

import { getActionTypes } from '../../Helpers/getActionTypes';

// Required for checkboxes
initializeIcons();

interface IProps {
    [key:string]: any;
};

interface IState {
    [key:string]: any;
}

export class OptionsTab extends React.Component<IProps, IState> {

    actionTypeList: IDropdownOption[];
    newLineList: IDropdownOption[];
    dateFormatList: IDropdownOption[];
    phoneFormatList: IDropdownOption[];

    constructor(props: object) {
        super(props);

        this.actionTypeList = getActionTypes();

        this.newLineList = [
            { key: "na", text: "Not applicable" },
            { key: "before", text: "1 line before" },
            { key: "2before", text: "2 lines before" },
            { key: "after", text: "1 line after" },
            { key: "2after", text: "2 lines after" },
            { key: "both", text: "1 line before & after" },
            { key: "2both", text: "2 lines before & after" },
        ];

        this.dateFormatList = [
            { key: "na", text: "Use system format (Default)" },
            { key: "%A, %-e_%B_%Y", text: "Monday, 1 January 1990" },
            { key: "%-e_%B_%Y", text: "1 January 1990" },
            { key: "%-e_%b_%Y", text: "1 Jan 1990" },
            { key: "%nth_day_of_%B_%Y", text: "1st day of January 1990" },
            { key: "%d/%m/%Y", text: "01/01/1990" },
            { key: "%d/%m/%y", text: "01/01/90" },
            { key: "%-e/%-m/%Y", text: "1/1/1990" },
            { key: "%-e/%-m/%y", text: "1/1/90" },
            { key: "description", text: "Date memo" }
        ];

        this.phoneFormatList = [
            {key: "na", text: "+64 (21) 555 1212 (Default)"},
            {key: "a", text: "64 21 555 1212" },
            {key: "c", text: "(021) 555 1212"},
            {key: "d", text: "021 555 1212"},
            {key: "e", text: "(21) 555 1212"},
            {key: "f", text: "21 555 1212"}
        ];
    }

    render() {
        
        const handleChange = this.props.handleChange;
        const insertField = this.props.insertField;
        const formState = this.props.formState;

        return (
            <div>

                <Dropdown id="actionType" 
                    label="Action Type" 
                    selectedKey={formState.actionType ? formState.actionType.key : undefined} 
                    onChange={handleChange} 
                    placeholder="Select an Action type" 
                    options={this.actionTypeList} />

                <Checkbox id="useMailMergeFields" label="Use mail merge fields instead of square brackets" onChange={handleChange} checked={formState.useMailMergeFields} />

                <Checkbox id="resetOnChange" label="Reset options when a different field is selected" onChange={handleChange} checked={formState.resetOnChange} />

                <Dropdown id="dateFormat" 
                    label="Date Format" 
                    selectedKey={formState.dateFormat ? formState.dateFormat.key : undefined} 
                    onChange={handleChange} 
                    placeholder="Select date format" 
                    options={this.dateFormatList} />

                <Dropdown id="phoneFormat" 
                    label="New Line" 
                    selectedKey={formState.newLine ? formState.newLine.key : undefined} 
                    onChange={handleChange} 
                    placeholder="Select new line(s) to be inserted" 
                    options={this.newLineList} />
                
                <Checkbox id="currencyToWords" label="Convert currency field to words" onChange={handleChange} checked={formState.currencyToWords} />

                <Checkbox id="noCurrencySymbol" label="Remove currency symbol" onChange={handleChange} checked={formState.noCurrencySymbol} />

                <TextField id="customOption" label="Custom option" onChange={handleChange} value={formState.prefix} />

                {/* BUTTONS */}

                <PrimaryButton text="Insert Field" onClick={insertField} />

            </div>
        )
    }
}