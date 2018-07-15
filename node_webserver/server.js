const express = require('express');
const hbs = require('hbs');

const app = express();
// Utilizando o Express para criar um server web...

hbs.registerPartials(__dirname + '/views/partials');
// Chamando o handlebars para dentro do express...
app.set('view engine', 'hbs');
// Utilizado para apresentar arquivos estaticos pelo server... Utilizando os arquivos da pasta public
app.use(express.static(__dirname + '/public'));

// Adicionando rotas via url com respostas em Json e Texto..
app.get('/', (req, res) => {
	// res.send('<h1>Hello Express</h1>');
	// res.send({
	// 	name: 'Diogo',
	// 	likes: [
	// 		'Dogs',
	// 		'Cats',
	// 		'Guitars'
	// 	]
	// });
	res.render('home.hbs', {
		pageTitle: 'Home Page Test',
		currentYear: new Date().getFullYear(),
		welcomeMessage: 'Welcome to My Website you shithead!'
	});

});

app.get('/about', (req, res) =>{
	// O Primeiro argumento do Render é a page, o segundo é o objeto que será enviado como valores para renderização
	res.render('about.hbs', {
		pageTitle: 'About Page Test',
		currentYear: new Date().getFullYear()
	});
	// res.send('<h1>About Page</h1>');
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