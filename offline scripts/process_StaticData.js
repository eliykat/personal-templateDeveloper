// Offline script used to populate the static (i.e. non-custom) data sources
// Only needs to be run once, and then if Actionstep updates its data in a future release.

// The only argument should be a CSV containing a complete export of AS merge fields.
// The format must be manually set in column N of the CSV:
// d = date
// c = currency
// s = string
// n = number (e.g. integer, floating point, percentage)
// p = phone number
// b = boolean
// h = header (in dropdown list)

// ASSUMPTIONS (EXTREMELY IMPORTANT):
// The spreadsheet is in the following order:
// Data source
// Sub-category
// Label

const papa = require('papaparse');
const fs = require('fs');

const csv = process.argv[2];
const csv_string = fs.readFileSync(csv).toString('utf-8');

let prevDataSource;
let prevSubCategory;

const json = {
    dataSources: []
};

let dataSources = json.dataSources;
let currentIndex;

papa.parse(csv_string, {
    complete: function (results){

        console.log('parsed');
        
        // Starts at 1 to skip headers
        for (var i = 1; i < results.data.length; i++) {

            // Skip empty rows
            if (results.data[i] == "") {
                continue
            }

            let column = results.data[i];

            let source = column[1];
            let subcategory = column[2];
            let label = column[3];
            let code = column[4];
            let desc = column[5];
            let format = column[6];

            // Create empty Custom Data datasource immediately before "Deposit slip"
            if (source != prevDataSource && source == "Deposit slip") {
                dataSources.push(
                    {
                        key: 'Custom Data',
                        text: 'Custom Data',
                        fields: []
                    }
                ) - 1;
            }

            // Create new datasource if required. This assumes the source file is ordered by data source
            // NB: key and text properties must be used as this reflects IDropdownOption
            if (source != prevDataSource) {
                currentIndex = dataSources.push(
                    {
                        key: source,
                        text: source,
                        fields: []
                    }
                ) - 1;
            }

            // Create new subcat if required. This assumes proper ordering of data file.
            if (subcategory != prevSubCategory && subcategory) {
                let field = {
                    key: subcategory,
                    text: subcategory,
                    format: 'h'
                }
                dataSources[currentIndex].fields.push(field);
            }

            // NB: key and text properties must be used as this reflects IDropdownOption
            let field = {
                key: code,
                text: label,
                format: format
            }

            dataSources[currentIndex].fields.push(field);

            prevDataSource = source;
            prevSubCategory = subcategory;
            
        }

        const stringified_json = JSON.stringify(json);

        fs.writeFile('static.json', stringified_json, (err) => {
            console.log('Success');
        })
    }
})