class PhoneBook {
  #contacts = [];
  #searchedUsers = [];
  #contactListElement = document.querySelector('.contacts__list');

  constructor(users) {
    // validate users

    // add users to contacts
    users.forEach((user) => {
      this.addContact(user);
    });

    this.renderContacts();
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

  renderContacts() {
    const listGroupElement = document.createElement('ul');
    listGroupElement.classList.add('list-group');

    const contactsListItemsElements = this.#contacts.map((contact) => this.createContactItem(contact));

    listGroupElement.append(...contactsListItemsElements);

    this.#contactListElement.append(listGroupElement);
  }

  createContactItem(user) {
    const liElement = document.createElement('li');
    liElement.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    liElement.setAttribute('data-user-id', user.id);

    const nameElement = document.createElement('span');
    nameElement.classList.add('contacts__contact');
    nameElement.textContent = user.name;

    const controlsElement = document.createElement('div');
    const buttonCallElement = document.createElement('button');
    const iconCallElement = document.createElement('i');
    const buttonDeleteElement = document.createElement('button');
    const iconDeleteElement = document.createElement('i');
    buttonCallElement.classList.add('btn', 'btn-success');
    iconCallElement.classList.add('bi', 'bi-telephone');
    buttonDeleteElement.classList.add('btn', 'btn-danger');
    iconDeleteElement.classList.add('bi', 'bi-trash');
    buttonCallElement.append(iconCallElement);
    buttonDeleteElement.append(iconDeleteElement);

    controlsElement.append(buttonCallElement, buttonDeleteElement);

    liElement.append(nameElement, controlsElement);

    return liElement;
  }

  get contacts() {
    return this.#contacts;
  }

  // your methods

  // All event handlers should be a separate private methods
}

const phoneBook = new PhoneBook(users);
console.log(phoneBook.contacts);
