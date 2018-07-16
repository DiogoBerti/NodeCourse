const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();
// Utilizando o Express para criar um server web...

hbs.registerPartials(__dirname + '/views/partials');
// Chamando o handlebars para dentro do express...
app.set('view engine', 'hbs');
// Adicionado middlewares..
// Esse Middleware cria um log de conexões que printa no console e escreve em um arquivo.
app.use((req, res, next) => {
	const now = new Date().toString();
	const log = `${now}: ${req.method} - ${req.url} = ${req.ip}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err){
			console.log('Unable to Append to server.log');
		}
	});
	// Next é a função que libera o server para prosseguir... se não for chamada, a pagina carrega infinitamente
	next();
});

// Middleware de manutenção, bloqueando todas as requisições e jogando para o site de manutenção..
app.use((req, res, next)=>{
	res.render('maintenance.hbs',{});
});

// Utilizado para apresentar arquivos estaticos pelo server... Utilizando os arquivos da pasta public
app.use(express.static(__dirname + '/public'));

// Registrando Helpers para chamar as funções na page..
hbs.registerHelper('getCurrentYear',() => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

// Adicionando rotas via url com respostas em Json e Texto..
app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page Test',
		welcomeMessage: 'Welcome to My Website you shithead!'
	});

});

app.get('/about', (req, res) =>{
	// O Primeiro argumento do Render é a page, o segundo é o objeto que será enviado como valores para renderização
	res.render('about.hbs', {
		pageTitle: 'About Page Test',
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