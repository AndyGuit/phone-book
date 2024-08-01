class User {
  #id = null;
  name = null;
  phone = null;
  email = null;
  website = null;

  constructor({ id, name, phone, email, website }) {
    // put data to fields
    this.#id = this.#validateId(id);
    this.name = this.#validateName(name);
    this.phone = this.#validatePhone(phone);
    this.email = this.#validateEmail(email);
    this.website = this.#validateWebsite(website);
  }

  #validateId(id) {
    return !id ? window.crypto.randomUUID() : id;
  }

  #validateEmail(email) {
    return email.includes('@') ? email : 'No valid email provided';
  }

  #validateName(name) {
    return name.length > 0 ? name : 'Unknown';
  }

  #validatePhone(phone) {
    return phone.length > 6 ? phone : 'No valid phone provided';
  }

  #validateWebsite(website) {
    return website.includes('.') ? website : 'No valid website';
  }

  static isUser(obj) {
    // check if obj is User instance
    return obj instanceof User;
  }

  get id() {
    return this.#id;
  }

  // your methods
}
