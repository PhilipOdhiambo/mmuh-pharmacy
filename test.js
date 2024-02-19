

// const x = [1, 2, 3, 4, 5];
// const [y, z] = x;
// console.log(y); // 1
// console.log(z); // 2

const users = [
    {name:"Philip",email:"philip@gmail.com",password:"1234"},
    {name:"Walter",email:"walter@yahoo.com",password:"1245"},
    {name:"Zack",email:"zack@gmail.com",password:"1497"},
    {name:"Young",email:"young@sony.com",password:"3402"},
]

let res = {}
users.forEach(user => res[user.name] = {email:user.email,password:user.password})

console.log(res)