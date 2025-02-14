const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const prompt = require('prompt-sync')();
const Customer = require('./models/customer.js');


const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await runMenuOptions();
    await mongoose.disconnect();
    process.exit();
};

//tried to write logic avoiding just putting 10 console.logs
//in here, finally got something that did exactly what the lab
//asked for
const runMenuOptions = async () => {
    const menu = `
    Welcome to the CRM
    
    What would you like to do?
    
    1. Create a customer
    2. View all customers
    3. Update a customer
    4. Delete a customer
    5. Quit
    `;
    let exit = false;
    while (!exit) {
        console.log(menu);
        const choose = prompt('Number of Action to run: ');
        const actions = {
            '1': createCustomer,
            '2': viewCustomers,
            // '3': updateCustomer,
            // '4': deleteCustomer,
            '5': () => {
                exit = true;
                console.log("You have exited the menu");
            },
        };
        if (actions[choose]) {
            await actions[choose]();
        } else {
            console.log('Choose a different number!');
        };
    }
};


const createCustomer = async () => {
    
    const name = prompt('Enter name:');
    const age = prompt('Enter age:');
    
    const newCustomer = new Customer({
        name, age: Number(age),
    });
    await newCustomer.save();
    console.log('Customer created:', newCustomer);
    };

const viewCustomers = async () => {

    const customers = await Customer.find();
    customers.forEach(customer => {
        console.log(`id: ${customer.id} -- Name: ${customer.name}, Age: ${customer.age}`);
    })
}
    


connect();