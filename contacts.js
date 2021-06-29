const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");

// TODO: список всех контактов
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    error.message = "Cannot read contacts file";
    throw error;
  }
}

// TODO: показать контакт по Id
async function getContactById(contactId) {
  try {
    const allContacts = await listContacts();
    const findedContact = allContacts.find(
      (contact) => contact.id === contactId
    );
    if (!findedContact) {
      throw new Error("Id incorrect");
    }
    return findedContact;
  } catch (error) {
    throw error;
  }
}
// TODO: удалить контакт по Id
async function removeContact(contactId) {
  try {
    const allContacts = await listContacts();
    const findedContact = allContacts.find(
      (contact) => contact.id === contactId
    );
    if (!findedContact) {
      throw new Error("Id incorrect");
    }
    const updatedContacts = allContacts.filter(
      (contact) => contact.id !== contactId
    );
    const str = JSON.stringify(updatedContacts);
    await fs.writeFile(contactsPath, str);
  } catch (error) {
    throw error;
  }
}
// TODO: добавить контакт по Id
async function addContact(name, email, phone) {
  try {
    const allContacts = await listContacts();
    const id = allContacts[allContacts.length - 1].id + 1;
    const newContact = { id, name, email, phone };
    const newContacts = [...allContacts, newContact];
    const str = JSON.stringify(newContacts);
    await fs.writeFile(contactsPath, str);
    return newContact;
  } catch (error) {
    throw error;
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
