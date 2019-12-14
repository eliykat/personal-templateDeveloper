import * as React from 'react';
import { Pivot, PivotItem, IPivotStyles } from 'office-ui-fabric-react/lib/Pivot';
import { FieldsTab } from './FieldsTab';
import { OptionsTab } from './OptionsTab';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { IStyleSet } from 'office-ui-fabric-react';

export default class App extends React.Component {

    constructor(props: object) {
        super(props);

        this.state = {
            // Fields tab
            dataSource: undefined,
            participantType: undefined,
            dataCollection: undefined,
            field: undefined,
            ignoreIfNull: false,
            repeatrn: false,
            prefix: "",
            suffix: "",

            // Options tab
            actionType: undefined,
            useMailMergeFields: false,
            resetOnChange: true,
            dateFormat: "na",
            phoneFormat: "na",
            currencyToWords: false,
            noCurrencySymbol: false,
            customOption: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.insertField = this.insertField.bind(this);

    }

    handleChange(event: any, newValue?: string | IDropdownOption | boolean | undefined) {
        let id = event.target.id;

        if (newValue !== undefined) {
            this.setState({
                [id]: newValue
            });
        }
    }

    insertField() {
        // let field = new asField(this.state);
        // field.insert();
        console.log("Insert field");
    }

    render() {
        return (
            <Pivot>
                <PivotItem headerText="Fields">
                    <FieldsTab handleChange={this.handleChange} insertField={this.insertField} formState={this.state} />
                </PivotItem>
                <PivotItem headerText="Options">
                    <OptionsTab handleChange={this.handleChange} insertField={this.insertField} formState={this.state} />
                </PivotItem>
                <PivotItem headerText="Conditional">
                    TODO CONDITIONAL
                </PivotItem>
                <PivotItem headerText="Repeat">
                    TODO REPEAT
                </PivotItem>
            </Pivot>
        )
    }
}