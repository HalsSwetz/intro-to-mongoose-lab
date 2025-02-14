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

//had a lot of console.logs, wanted something easier to read
//would need to comment back in the actions('3' and '4') below
//to have the updateCustomer and deleteCustomer functional

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


//would need to add a call function or comment back in
const updateCustomer = async () => {
    const id = '6573745144784f6dc034e1df';
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { isComplete: true },
      { new: true }
    );
    console.log("Updated customer:", updatedCustomer);
  };
 
  

//would need to comment back in the function above

const deleteCustomer = async () => {
    const id = '6573745144784f6dc034e1df';
    const removedCustomer = await Customer.findByIdAndDelete(id);
    console.log('Removed customer:', removedCustomer)
  }
  

