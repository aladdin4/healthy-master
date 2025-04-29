export class User {
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  id: string;
  customer_address: string;
  customer_phone: string;
  password: string;
  customer_prefrences?: string;
  fullName?: string;
  initials?: string = "";
  token?: string;
  constructor (
    email: string ="",
    role: string = "",
    first_name: string = "",
    last_name: string = "",
    id: string = "",
    customer_address: string = "",
    customer_phone: string = "",
    customer_prefrences: string = "",
    token: string = "",
    password: string = ""
  ) {

    this.email = email;
    this.role = role;
    this.first_name = first_name;
    this.last_name = last_name;
    this.id = id;
    this.fullName = `${first_name} ${last_name}`;
    if (first_name && last_name) {
      this.initials = `${first_name.charAt(0)}${last_name.charAt(0)}`;
    };
    this.customer_address = customer_address;
    this.customer_phone = customer_phone;
    this.customer_prefrences = customer_prefrences;
    this.token = token;
    this.password = password;
  }
}

