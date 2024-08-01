class PhoneBook {
  #contacts = [];
  #searchedUsers = null;
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

  removeContact(event) {
    const isClickedOnRemove = event.target.closest('.btn-danger');

    if (!isClickedOnRemove) return;

    const contactElement = event.target.closest('.list-group-item');
    const contactId = contactElement.getAttribute('data-user-id');

    this.#contacts = this.#contacts.filter((contact) => contact.id.toString() !== contactId);

    this.renderContacts();
  }

  search(event) {
    const searchValue = event.target.value.trim().toLowerCase();

    this.#searchedUsers =
      searchValue.length > 0
        ? this.#contacts.filter((user) => {
            const { name, email, website } = user;
            const isName = name.toLowerCase().includes(searchValue);
            const isEmail = email.toLowerCase().includes(searchValue);
            const isWebsite = website.toLowerCase().includes(searchValue);

            return isName || isEmail || isWebsite;
          })
        : null;

    this.renderContacts();
  }

  #setEvents() {
    this.#searchInputElement.addEventListener('input', this.search.bind(this));
    this.#contactListElement.addEventListener('click', this.removeContact.bind(this));
  }

  renderContacts() {
    this.#contactListElement.innerHTML = '';

    const listGroupElement = document.createElement('ul');
    listGroupElement.classList.add('list-group');

    const contactsItems = this.#searchedUsers ? this.#searchedUsers : this.#contacts;

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
