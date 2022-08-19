const person = {
  firstName: "Murali",
  lastName: "Krishna",
  display: function () {
    console.log(this.firstName + " " + this.lastName);
    return this.firstName + " " + this.lastName;
  }
};

const person1 = {
  firstName: "Vamsi",
  lastName: "Krishna"
};

let f2 = person.display.bind(person1);
console.log(f2);
let output = person.display(); // this refers to person object
console.log(output);

setTimeout(person.display, 2000);
//after 2sec, this refers to window object. After 2sec, if you want to access the person object only, then you need to use bind() method.

console.log("script execution completed");
