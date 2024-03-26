import inquirer from 'inquirer';
import chalk from 'chalk'; // Import chalk

// Define the menu items and their prices
const menu: { [key: string]: number } = {
    'Biriani': 200,
    'Pizza': 300,
    'Burger': 150,
    'sandwich':250,
    // Add more items here as needed
};

async function takeOrder(): Promise<{ [key: string]: number }> {
    const order: { [key: string]: number } = {};

    console.log(chalk.rgb(255, 136, 0).bold('Welcome to the restaurant!')); // Use Chalk's rainbow color support
    console.log(chalk.rgb(255, 136, 0).bold('Please select your items from the menu:'));

    while (true) {
        const { item, quantity, addMore } = await inquirer.prompt([
            {
                type: 'list',
                name: 'item',
                message: 'Select an item:',
                choices: Object.keys(menu),
            },
            {
                type: 'number',
                name: 'quantity',
                message: 'Enter the quantity:',
                validate: (input) => input > 0 || 'Please enter a valid quantity.',
            },
            {
                type: 'confirm',
                name: 'addMore',
                message: 'Would you like to add more items?',
                default: false,
            },
        ]);

        order[item] = (order[item] || 0) + quantity;

        if (!addMore) {
            break;
        }
    }

    return order;
}

async function main() {
    const order = await takeOrder();
    let totalAmount = 0;

    console.log(chalk.rgb(255, 136, 0).bold('\nYour order:')); // Use Chalk's rainbow color support
    Object.keys(order).forEach((item) => {
        const quantity = order[item];
        const price = menu[item];
        const itemTotal = quantity * price;
        console.log(`${chalk.yellow(item)}: ${quantity} x ${price} = ${itemTotal}`); // Use Chalk's color functions
        totalAmount += itemTotal;
    });

    console.log(chalk.rgb(255, 136, 0).bold(`Total: ${totalAmount}`)); // Use Chalk's rainbow color support
}

main().catch(console.error);
