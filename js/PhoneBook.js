class PhoneBook {
  #contacts = [];
  #searchedUsers = [];

  constructor(users) {
    // validate users

    // add users to contacts
    console.log('users: ', users);
    users.forEach((user) => {
      this.addContact(user);
    });
  }

  addContact(user) {
    this.#contacts.push(new User(user));
  }

  call(contactId) {
    // find contact in contacts and make a call
  }

  removeContact(contactId) {
    // will remove contact from this.#contacts
  }

  search() {
    // will search contact by: name, phone, email
  }

  #setEvents() {
    // will add event listeners to contact book
  }

  get contacts() {
    return this.#contacts;
  }

  // your methods

  // All event handlers should be a separate private methods
}

const phoneBook = new PhoneBook(users);
console.log(phoneBook.contacts);
