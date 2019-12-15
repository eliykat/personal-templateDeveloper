import * as React from 'react';
import { PrimaryButton } from "office-ui-fabric-react";


interface IInsertButtonProps {
    handleClick: any,
    buttonText: string
}

export function InsertButton(props: IInsertButtonProps) {

    const { handleClick, buttonText } = props;

    return (
        <div className="footer">
            <PrimaryButton text={buttonText} onClick={handleClick} />
        </div>
    )
}