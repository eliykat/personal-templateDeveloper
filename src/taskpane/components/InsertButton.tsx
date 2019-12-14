import * as React from 'react';
import { PrimaryButton } from "office-ui-fabric-react";


export function InsertButton(props) {

    const { insertField } = props;

    return (
        <div className="footer">
            <PrimaryButton text="Insert Field" onClick={insertField} />
        </div>
    )
}