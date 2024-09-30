const fs = require("fs");
const path = require("path");


const folder = path.join(__dirname, "json-files");

async function problem_01_process(count) {
    try {
        await make_directory(folder);
        console.log("Directory created..!");

        const json_files = await generate_json_file(count);
        console.log("json files generated..!");
        

    } catch (error) {

    }
}

problem_01_process();

async function make_directory(dirPath) {
    return new Promise((resolve, reject) => {
        fs.mkdir(dirPath, { recursive: true }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("");
            }
        })
    })
}

