const req = require('express/lib/request')
const db = require('../models')
const { use } = require('../routes/UserRoute')
const  commonHelper  = require('../helper/common')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')

dotenv.config({path: 'app.env'})
// create main Model
const User = db.User

// Main work


//1. create user

const addUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const usr = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        password: await bcrypt.hash(req.body.password, salt),
        phoneno: req.body.phoneno,
        country: req.body.country
    }
    //const info = req.body
    const user = await User.create(usr)
    res.status(200).send(user)
}

//2. show all user

const getUser = async (req, res) => {
    const { page, size } = req.query
    const { limit, offset } = commonHelper.getPagination(page, size)
    const users = await User.findAndCountAll({ limit, offset })
    res.status(200).send(users)
}

//3. get single user

const getOneUser = async (req, res) => {
    const user = await User.findOne({ where: {id: req.query.id } })
    //const user = await User.findByPk( req.params.id )
    if(!user) {
        res.status(400).send('User not present')
    }
    res.status(200).send(user)
}

//4. update an user

const updateUser = async (req, res) => {
    const user = await User.update(req.body, { where: { id: req.query.id }})
    res.status(200).send(user)
}

//5. delete an user

const deleteUser = async (req, res) => {
    await User.destroy({ where: { id: req.params.id }})
    res.status(200).send('User is deleted')
}

//6. login

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email }})
    //console.log(user)
    if (user) {
        const password_valid = await bcrypt.compare(password, user.password)
        //console.log("Password Match:", password_valid)
        //console.log("Secret token:", process.env.SECRET)
        if (password_valid) {
            token = jwt.sign({ "id" : user.id, 
            "firstName" : user.firstName, 
            "lastName" : user.lastName, 
            "email" : user.email,
            "phoneno" : user.phoneno,
            "country" : user.country,
            "address" : user.address
            },process.env.SECRET)
            res.status(200).send(token)
        } else {
            res.status(400).send('Invalid password')
        }
    } else {
        res.status(400).send('User not present')
    }
}

module.exports = {
    addUser,
    getUser,
    getOneUser,
    updateUser,
    deleteUser,
    login
}
