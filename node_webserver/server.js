const express = require('express');

const app = express();
// Utilizando o Express para criar um server web...

// Utilizado para apresentar arquivos estaticos pelo server... Utilizando os arquivos da pasta public
app.use(express.static(__dirname + '/public'));

// Adicionando rotas via url com respostas em Json e Texto..
app.get('/', (req, res) => {
	// res.send('<h1>Hello Express</h1>');
	res.send({
		name: 'Diogo',
		likes: [
			'Dogs',
			'Cats',
			'Guitars'
		]
	});
});

app.get('/about', (req, res) =>{
	res.send('<h1>About Page</h1>');
});

app.get('/bad', (req, res) =>{
	res.send({
		errorMessage : 'An Error Ocurred...' 
	});
});

// O Segundo argumento do Listen é opcional...
app.listen(3000, () =>{
	console.log('Server is running on port 3000');
});