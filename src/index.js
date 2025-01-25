const express = require('express')
const path = require('node:path')

const app = express()

let savedUsers = []
let currentUser = ''

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.render('form')
})

app.post('/register', (req, res) => {
    const userName = req.body.username
    const userEmail = req.body.email

    currentUser = userName

    savedUsers.push({ userName, userEmail })

    res.redirect('/congratulations')
})

app.get('/congratulations', (req, res) => {
    console.log(savedUsers)
    res.render('page', { users: savedUsers, currentUser })
})

app.get('/emails', (req, res) => {
    res.render('email', { users: savedUsers })
})

app.post('/emails/delete', (req, res) => {
    let userNameDeleted = req.body
    let userDeleted = savedUsers.find(obj => obj.userName === userNameDeleted.username)
    let indexDeleted = savedUsers.indexOf(userDeleted)
    savedUsers.splice(indexDeleted, 1)

    res.redirect('/emails')
})

const PORT = 3000

app.listen(PORT, () => {
    console.log('Servidor iniciado!')
})