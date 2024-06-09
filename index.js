#! /usr/bin/env node
// importing the inquirer package 
import inquirer from "inquirer";
// importing the chalk package for coloring text in the terminal
import chalk from "chalk";
// printing welcome message in the blue text
console.log(chalk.blue.bold("Welcome to ToDoList:"));
// initializing an empty array to store todo list items
let todosList = [];
// A condition to control the while loop
let condition = true;
while (condition) {
    let userInput = await inquirer.prompt([
        {
            type: "input",
            name: "todos",
            message: chalk.green("enter an items in your todo list")
        },
        {
            type: "confirm",
            name: "addMore",
            message: chalk.yellow("Do you want to add more items in your todo list"),
            default: false
        },
        {
            type: "confirm",
            name: "seeList",
            message: chalk.redBright("Do you want to see your todo list"),
            when(userInput) {
                // This prompt only appears if the user does not want to add more items
                return (userInput.addMore === false);
            }
        }
    ]);
    // Destructuring the user input into separate variables
    let { todos, addMore, seeList } = userInput;
    if (todos) {
        todosList.push(todos); // Adding the new todo item to the todo list array
    }
    if (seeList) {
        // printing message before displaying the todo list
        console.log(chalk.dim("Here is your todo list:"));
        todosList.forEach((item, index) => {
            // printing each todo list items in the grey text with its index
            console.log(chalk.grey(`${index + 1}. ${item}`));
        });
        // updating 'condition' based on the user's choice to addmore or notc
        condition = addMore;
    }
}
