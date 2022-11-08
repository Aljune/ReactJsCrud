import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/user'
import UserValidator from 'App/Validators/UserValidator'
import jwt from 'jsonwebtoken'

export default class RegistersController {

  public async index({ response }: HttpContextContract) {
    const users = await User.query().orderBy('id', 'asc')
    console.log(users)

    return response.status(200).json(users)
  }

  public async login({ request, response, auth, session }: HttpContextContract) {
    const username = request.body().username
    const password  = request.body().password

    console.log(username, password)

    const user = await User.query().where('username', username).first()

    const jwtAuth = {
      username: user?.username,
      password: user?.password
    }

    // make validator to check if email exist
    if (!user) return response.status(401).json({ message: 'invalid email' })
    try {
      // compare password using bcrypt if not matched throw error
      if (await Hash.verify(user.password, password)) {
        await auth.attempt(username,password)
        // if valid, generate token using JSONWEBTOKEN
        const token = jwt.sign(jwtAuth, 'privateKey', { expiresIn: "30 mins" })
        console.log(token)
        let jwtCookie = `JWT=${token}; Domain="localhost";`;
        response.append('set-cookie', jwtCookie)
        return response.ok({
          token
        })
      }
    } catch {
      session.flash('form', 'invalid')
      return response.redirect().back()
    }
    return response.redirect('/')

    // last, send to client to store the cookie

  }


  public async create({ request, response, auth }: HttpContextContract) {

    const validated = await request.validate(UserValidator)
    const register = await User.create({
      username: validated.username,
      email: validated.email,
      password: validated.password,
      // rememberMeToken: validated.remember_me_token
    })

    console.log(register)
    await auth.login(register)
    return response.redirect("/")
  }

  // public async store({ request, response, auth, session }: HttpContextContract) {
  //   // const {username, password} = await request.only(['username', 'password'])
  //   // const username = await request.input('username')
  //   // const email = await request.input('email')
  //   // const password = await request.input('password')


  //   // const user = await User.query().where('username', username ).where( 'email', email).first()

  //   const jwtAuth = {
  //     username: 'humfurie'
  //     // email: user?.email,
  //     // password: user?.password
  //   }

  //   console.log(jwtAuth)

  //   const token = jwt.sign({jwtAuth}, 'privateKey')
  //   response.json({
  //     token
  //   })

  // make validator to check if email exist

  // compare password using bcrypt if not matched throw error

  // if valid, generate token using JSONWEBTOKEN

  // last, send to client to store the cookie



  public async show({ response, params }: HttpContextContract) {
    const employee = await User.query().where('id', params.id).first()

    return response.status(200).json(employee)
  }

  public async logout({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
  
    try {
      await auth.use('web').attempt(email, password)
      response.redirect('/')
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  // public async token({request,response}: HttpContextContract) => {

  // }
}



