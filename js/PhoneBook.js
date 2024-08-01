class PhoneBook {
  #contacts = [];
  #searchedUsers = [];
  #contactListElement = document.querySelector('.contacts__list');
  #searchInputElement = document.getElementById('contacts-search');

  constructor(users) {
    // validate users

    // add users to contacts
    users.forEach((user) => {
      this.addContact(user);
    });

    this.#setEvents();
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

  search(event) {
    // will search contact by: name, phone, email
    const searchValue = event.target.value.trim().toLowerCase();

    this.#searchedUsers =
      searchValue.length > 0 ? this.#contacts.filter((user) => user.name.toLowerCase().includes(searchValue)) : [];

    this.renderContacts();
  }

  #setEvents() {
    // will add event listeners to contact book
    this.#searchInputElement.addEventListener('input', this.search.bind(this));
  }

  renderContacts() {
    this.#contactListElement.innerHTML = '';

    const listGroupElement = document.createElement('ul');
    listGroupElement.classList.add('list-group');

    const contactsItems = this.#searchedUsers.length > 0 ? this.#searchedUsers : this.#contacts;

    const contactsListItemsElements = contactsItems.map((contact) => this.createContactItem(contact));

    listGroupElement.append(...contactsListItemsElements);

    this.#contactListElement.append(listGroupElement);
  }

  createContactItem(user) {
    const liElement = document.createElement('li');
    liElement.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    liElement.setAttribute('data-user-id', user.id);

    const contactElementWrapper = document.createElement('div');
    contactElementWrapper.classList.add('d-flex', 'flex-column');

    const nameElement = document.createElement('span');
    nameElement.classList.add('contacts__contact', 'fw-bold');
    nameElement.textContent = user.name;

    const emailElement = document.createElement('span');
    emailElement.textContent = user.email;
    const websiteElement = document.createElement('span');
    websiteElement.textContent = user.website;

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

    contactElementWrapper.append(nameElement, emailElement, websiteElement);

    liElement.append(contactElementWrapper, controlsElement);

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
