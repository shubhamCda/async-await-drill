const path = require("path");

const { make_directory } = require("../problem_01.cjs");


const folder = path.join(__dirname, "json-files");

async function problem_01_process(count) {
    try {
        await make_directory(folder);
        console.log("Directory created..!");

        const json_files = await generate_json_file(count);
        console.log("json files generated..!");


    } catch (error) {
        console.log("Something is wrong..!", error);

    }
}

problem_01_process();