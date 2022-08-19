//Array methods practice file
const users = [
  { firstName: "murali", lastName: "krishna", age: 27 },
  { firstName: "rushi", lastName: "jadhav", age: 29 },
  { firstName: "santosh", lastName: "kate", age: 30 },
  { firstName: "vidya", lastName: "sri", age: 30 }
];

//display fullNames of all the persons (traditional way)
function fullNames(users) {
  var names = [];
  for (let i = 0; i < users.length; i++) {
    names.push(users[i].firstName + " " + users[i].lastName);
  }
  return names;
}
console.log(fullNames(users));

//display fullNames of all the persons (using map)
const names = users.map((x) => x.firstName + " " + x.lastName);
console.log(names);

//sum of all the ages in the array (general way of calculating)
function sum(users) {
  var sum = 0;
  for (let i = 0; i < users.length; i++) {
    sum += users[i].age;
  }
  return sum;
}
console.log(sum(users));

//calculating sum using reduce method
const res = users.reduce(function (acc, curr) {
  acc += curr.age;
  return acc;
}, 0);
console.log(res);

//find the person having highest age in the array (general way of finding)
function personHighAge(users) {
  var newArr = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].age < 30) {
      newArr.push(users[i].firstName);
    }
  }
  return newArr;
}
console.log(personHighAge(users));

//print the firstNames of all the persons whose age is < 30 (using map)
const output = users
  .filter(function (user) {
    if (user.age < 30) {
      return user.firstName;
    }
  })
  .map((x) => x.firstName);
console.log(output);

//print the firstNames of all the persons whose age is < 30 (using reduce)
const output2 = users.reduce(function (acc, curr) {
  if (curr.age < 30) {
    //console.log(curr.firstName);
    acc.push(curr.firstName);
  }
  return acc;
}, []);
console.log(output2);
