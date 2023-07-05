import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import {  isEmpty } from 'lodash'

export default class AccountsController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const user = await User.create({ ...request.only(['email', 'username', 'password']) })

      response.status(201).json(user);
    } catch (error) {
      response.send(error);
    }
  }


  public async show({ response, auth }: HttpContextContract) {
    try {
      const currentUser = auth.use('api').user

      if (!isEmpty(currentUser)) {
        response.status(200).json(currentUser);
      } else {
        response.status(401).json({message: 'Unauthorized'})
      }
    } catch (error) {
      response.send(error);
    }
  }

  public async update({ response, request, auth }: HttpContextContract) {
    try {

      const currentUser = auth.use('api').user

      if (!isEmpty(currentUser)) {
        await currentUser?.merge({ ...request.only(['email', 'username', 'password']) }).save()
        response.status(200).json(currentUser);
      } else {
        response.status(401).json({message: 'Unauthorized'})
      }
    } catch (error) {
      response.send(error);
    }
  }

  public async destroy({ response, auth }: HttpContextContract) {
    try {

      const currentUser = auth.use('api').user

      if (!isEmpty(currentUser)) {
        await currentUser?.delete();
        response.status(204)
      } else {
        response.status(401).json({ message: 'Unauthorized' })
      }
    } catch (error) {
      response.status(error.status).send(error);
    }
  }
}
