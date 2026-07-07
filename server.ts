import { connectDB } from "./config/db.ts";

connectDB();

class Person {
  age: number;
  name: string;
  email: string;

  constructor(age: number, name: string, email: string){
this.age = age,
this.name = name,
this.email = email
  }
}

const person = new Person(24, 'Eduardo', 'teste@')
