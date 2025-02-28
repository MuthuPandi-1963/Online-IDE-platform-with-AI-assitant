import express from 'express'
import RegisterPage from '../Controllers/Authentication/Register.js'
import LoginPage from '../Controllers/Authentication/Login.js'
import RefreshAuth from '../Controllers/Authentication/RefreshAuth.js'

const authRoutes  =  express.Router()

authRoutes.post("/register",RegisterPage)
authRoutes.post("/login",LoginPage)
authRoutes.get("/refreshAuth",RefreshAuth)

export default authRoutes;