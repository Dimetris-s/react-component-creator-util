const fs = require('fs/promises');
const path = require('path');
const {firstLetterToLowerCase} = require("./firstLetterToLowerCase");
const {rtkApiTemplate} = require("../templates/rtkApi");

const createRtkApi = async ({ sliceName, slicePath }) => {
    try {
        await fs.mkdir(path.resolve(slicePath, 'api'), { recursive: true });
        await fs.writeFile(
            path.resolve(slicePath, 'api', `${firstLetterToLowerCase(sliceName)}Api.ts`),
            rtkApiTemplate({sliceName})
        )
    } catch(e) {
        console.log('Cannot create rtk api', e);
    }
}

module.exports = {createRtkApi}
