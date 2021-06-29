const contacts = require("./contacts.js");
const { Command } = require("commander");
const programm = new Command();
programm
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");
programm.parse(process.argv);
const argv = programm.opts();
(async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const allContacts = await contacts.listContacts();
        console.table(allContacts);
        break;
      case "get":
        const contactById = await contacts.getContactById(Number(id));
        console.log(contactById);
        break;
      case "add":
        const addedContact = await contacts.addContact(name, email, phone);
        console.log("Contact was added", addedContact);
        break;

      case "remove":
        await contacts.removeContact(Number(id));
        console.log(`Contact with Id=${id} was removed`);
        break;
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.log(error);
  }
})(argv);
