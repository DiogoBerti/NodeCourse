// Cria uma função que retorna uma promise, onde o resolve soma, e o reject depende do tipo
const asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number'){
                resolve(a + b);
            }else{
                reject('Some arguments are not numbers...');
            };
        }, 1500);
    });
};

// asyncAdd(5, 19).then((res) =>{
//     console.log(`Result is: ${res}`);
// }, (errorMessage)=>{
//     console.log(errorMessage);
// });

// Chama a função uma vez e, ao fim do resolve, returna outra vez a função..
asyncAdd(5, 19).then((res) =>{
    console.log(`Result is: ${res}`);
    return asyncAdd(res, 54);
})
// Chama o Then da função chamada no return acima!
.then((res) => {
    console.log(`Result now is ${res}!`);
})
// Trata todos os erros que podem ocorrer nas duas chamadas
.catch((errorMessage) => {
    console.log(errorMessage);
});



// const somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Hey, it Worked!');
//         // reject('Oh-oh, Unable to fulfill promise');
//     }, 2500);
// });
//
// // Funciona como um callback....
// // Apenas um resolve ou um reject podem ocorrer...
// somePromise.then((msg) => {
//     console.log('Succes: ', msg);
// }, (errorMessage) =>{
//     console.log(errorMessage);
// });
