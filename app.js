const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var employees = [];
const managerQuestions = [
    {
        type: "input",
        message: "What is your manager's name?",
        name: "managerName",
        validate: answers => {
            if (answers.match(/^[A-Za-z\s]+$/)){
                return true;
            }
            return "Please enter a valid manager name."
        }
    },
    {
        type: "input",
        message: "What is your manager's ID?",
        name: "managerID",
        validate: answers => {
            if (answers.match(/^[1-9]\d*$/)){
                return true;
            }
            return "Please enter a valid ID number."
        }
    },
    {
        type: "input",
        message: "What is your manager's email?",
        name: "managerEmail",
        validate: answers => {
            if (answers.match(/\S+@\S+\.\S+/)) {
                return true;
            }
            return "Please enter a valid email address."
        }
    },
    {
        type: "input",
        message: "What is your manager's office number?",
        name: "officeNumber",
        validate: answers => {
            if (answers.match(/^[1-9]\d*$/)) {
                return true;
            }
            return "Please enter a valid office number."
        }
    }
]

const engineerQuestions = [{
    type: "input",
    message: "What is your engineer's name?",
    name: "engineerName",
    validate: answers => {
        if (answers.match(/^[A-Za-z\s]+$/)){
            return true;
        }
        return "Please enter a valid engineer name."
    }
},
{
    type: "input",
    message: "What is your engineer's ID?",
    name: "engineerID",
    validate: answers => {
        if (answers.match(/^[1-9]\d*$/)){
            return true;
        }
        return "Please enter a valid ID number."
    }
},
{
    type: "input",
    message: "What is your engineer's email?",
    name: "engineerEmail",
    validate: answers => {
        if (answers.match(/\S+@\S+\.\S+/)) {
            return true;
        }
        return "Please enter a valid email address."
    }
},
{
    type: "input",
    message: "What is your engineer's GitHub username?",
    name: "github",
    validate: answers => {
        if (answers.match(/^[A-Za-z0-9-_]+$/)){
            return true;
        }
        return "Please enter a valid GitHub ID."
    }
}]

const internQuestions = [{
    type: "input",
    message: "What is your intern's name?",
    name: "internName",
    validate: answers => {
        if (answers !== ""){
            return true;
        }
        return "Please enter a valid intern name."
    }
},
{
    type: "input",
    message: "What is your intern's ID?",
    name: "internID",
    validate: answers => {
        if (answers.match(/^[1-9]\d*$/)){
            return true;
        }
        return "Please enter a valid ID number."
    }
},
{
    type: "input",
    message: "What is your intern's email?",
    name: "internEmail",
    validate: answers => {
        if (answers.match(/\S+@\S+\.\S+/)) {
            return true;
        }
        return "Please enter a valid email address."
    }
},
{
    type: "input",
    message: "What is your intern's school?",
    name: "school",
    validate: answers => {
        if (answers !== ""){
            return true;
        }
        return "Please enter a valid school name."
    }
}]

const newEmployeeQuestion = [
    {
        type: "list",
        message: "Which type of team member would you like to add?",
        name: "role",
        choices: ["Engineer", "Intern", "I don't want to add any more team members"]
    },
]

const init = async () => {
    const answers = await inquirer.prompt(managerQuestions);
    var newManager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.officeNumber);
    employees.push(newManager);
    await moreEmployees();
}

const write = async () => {
    try {
        await writeFile(outputPath, render(employees));
        console.log("You're HTML File has been rendered!");
    } catch (err) {
        console.log(err);
    }
}

const moreEmployees = async () => {
    const { role } = await inquirer.prompt(newEmployeeQuestion);
    if (role === "Engineer") {
        addEngineer();
    } else if (role === "Intern") {
        addIntern();
    } else {
        write();

    }
}

const addEngineer = async () => {
    const engineerAnswers = await inquirer.prompt(engineerQuestions);
    var newEngineer = new Engineer(engineerAnswers.engineerName, engineerAnswers.engineerID, engineerAnswers.engineerEmail, engineerAnswers.github);
    employees.push(newEngineer);
    await moreEmployees();
}

const addIntern = async () => {
    const internAnswers = await inquirer.prompt(internQuestions);
    var newIntern = new Intern(internAnswers.internName, internAnswers.internID, internAnswers.internEmail, internAnswers.school);
    employees.push(newIntern);
    moreEmployees();
}

init();





