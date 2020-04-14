import { IASField } from "./interfaces";

export function insertField(useMailMergeFields: boolean, startField: IASField, endField: IASField | undefined): void {
    if (useMailMergeFields) {
        insertMailMergeField(startField, endField);
    }
    else {
        insertBracketField(startField, endField);
    }
}

function insertBracketField(startField: IASField, endField: IASField | undefined) {
    Word.run( (context) => {

        var range = context.document.getSelection();

        if (endField === undefined) {
            range.insertText("[[" + startField.code + "]]", "Replace");
        }
        else {
            range.insertText("[[" + startField.code + "]]", "Before");
            range.insertText("[[" + endField.code + "]]", "After");
        }

        return context.sync();
    }); //.catch(errorhandler);
}

function insertMailMergeField(startField: IASField, endField: IASField | undefined) {

    let startXML, endXML;

    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
        if (xhr.status != 200) {
            console.log("Error retrieving XML");
        }

        startXML = xhr.responseText;
        endXML = xhr.responseText;
        
        // Replace field code and field text for startXML
        startXML = startXML.replace('FIELD_CODE', startField.code);
        startXML = startXML.replace('FIELD_TEXT', startField.label);

        Word.run( (context) => {

            const range = context.document.getSelection();

            if (endField === undefined) {
                range.insertOoxml(startXML, "Replace");
            } else {
                endXML = endXML.replace('FIELD_CODE', endField.code);
                endXML = endXML.replace('FIELD_TEXT', endField.label);

                range.insertOoxml(startXML, "Before");
                range.insertOoxml(endXML, "After");
            }

            return context.sync().then(() => {
                console.log('Sync success');
            });
        }); //.catch(errorHandler);
    };

    xhr.open("GET", "assets/mergefield.xml", true);
    xhr.send();
}