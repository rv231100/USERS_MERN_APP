// console.log("hello ts..")

// let bal:number=100

// let amt:string='10'
// bal+=parseInt(amt)
// console.log(bal)

function add(num1:number|string,num2:number|string):number|string{
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        return num1 + num2;
    }
    return num1.toString()+ " " + num2.toString();
}
let res = add("hello","to this add fun")
console.log(res)