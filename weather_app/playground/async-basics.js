console.log('Starting app!');

// Usado para chamar alguma função após o tempo estipulado pelo segundo argumento (em milisegundos)
setTimeout(() => {
  console.log('Inside of Callback!');
}, 2000);

setTimeout(() => {
  console.log('Whats?');
}, 0);

console.log('Finishing Up!');
