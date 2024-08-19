export { };

declare global {
  interface User {
    id?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    mobile?: string;
    dateBirth?: string;
    address?: string;
    apt?: string;
  }
}
