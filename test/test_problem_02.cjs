const path = require("path");


const { file_reader, convert_to_uppercase, convert_to_lowercase, delete_files, sort_content, store_filenames } = require("../problem_02.cjs")

const input_file_path = path.join(__dirname, "../lipsum.txt");
const uppercase_file_path = path.join(__dirname, "../uppercase.txt");
const lowercase_file_path = path.join(__dirname, "../lowercase.txt");
const sorted_file_path = path.join(__dirname, "../sorted.txt");
const filenames_path = path.join(__dirname, "../filenames.txt");


async function problem_02_process() {
    try {
        const input_file_data = await file_reader(input_file_path);
        console.log("file read successfully");

        await convert_to_uppercase(input_file_data, uppercase_file_path);
        console.log("uppercase file updated successfull..!");

        await store_filenames(filenames_path,uppercase_file_path);
        console.log("filenames.txt updated..!");

        const uppercase_file_content = await file_reader(uppercase_file_path);
        await convert_to_lowercase(uppercase_file_content, lowercase_file_path);
        console.log("lowercase.txt updated..!");


        await store_filenames(filenames_path,lowercase_file_path);
        console.log("filenames.txt updated..!");

        const lowercase_file_content = await file_reader(lowercase_file_path);
        await sort_content(lowercase_file_content, sorted_file_path);
        console.log("sorted.txt updated..!");

        await store_filenames(filenames_path, sorted_file_path);
        console.log("filenames.txt updated..!");

        const filenames_content = await file_reader(filenames_path);
        await delete_files(filenames_content);
        console.log("Deleted successfully..!");     



    } catch (error) {
        console.log("Something went wrong.!", error);
        
    }
}
problem_02_process();