const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }))
// const JWT = require('jsonwebtoken')
// const secretWord = 'Samus#Aran'

const credentials = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'samus'
}

app.get('/', (req, res) => {
	res.send('hola desde tu primera ruta de la Api')
})

app.post('/api/login', (req, res) => {
	const { username, password } = req.body
	const values = [username, password]
	var connection = mysql.createConnection(credentials)
	connection.query("SELECT * FROM login WHERE username = ? AND password = ?", values, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			if (result.length > 0) {
				res.status(200).send({
					"id": result[0].id,
					"user": result[0].user,
					"username": result[0].username
				})
			} else {
				res.status(400).send('Usuario no existe')
			}
		}
	})
	connection.end()
})
app.post("/api/create",(req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
    var connection = mysql.createConnection(credentials)

    connection.query('INSERT INTO empleados(nombre,edad,pais,cargo,anios) VALUES(?,?,?,?,?)',[nombre,edad,pais,cargo,anios],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        }
    );
});
app.get("/api/empleados",(req,res)=>{
    var connection = mysql.createConnection(credentials)

    connection.query('SELECT * FROM empleados',
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});
app.put("/api/update",(req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
    var connection = mysql.createConnection(credentials)

    connection.query('UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=?',[nombre,edad,pais,cargo,anios,id],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        }
    );
});
app.delete("/api/delete/:id",(req,res)=>{
    const id = req.params.id;
    var connection = mysql.createConnection(credentials)

    connection.query('DELETE FROM empleados WHERE id=?',id,
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        }
    );
});

app.listen(4000, () => console.log('hola soy el servidor'))