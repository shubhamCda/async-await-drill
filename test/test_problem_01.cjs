const path = require("path");

const { make_directory, json_file_generator, delete_files } = require("../problem_01.cjs");


const folder = path.join(__dirname, "../json-files");

async function problem_01_process(count) {
    try {
        await make_directory(folder);
        console.log("Directory created..!");

        const json_file = await json_file_generator(count, folder);      
        console.log("json files generated..!");

        await delete_files(json_file);
        console.log("Deleted successfully..!");
        

    } catch (error) {
        console.log("Something is wrong..!", error);

    }
}

problem_01_process(4);