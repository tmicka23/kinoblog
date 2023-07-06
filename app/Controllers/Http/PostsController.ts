import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {

  public async index({ response, auth, request }: HttpContextContract) {
    try {
      const currentUser = auth.use('api').user

      if (currentUser) {
        const posts = await Post.query().where('userId', currentUser?.id).filter(request.qs()).paginate(request.qs().page, request.qs().per_page)

        response.status(200).json(posts)
      } else {
        response.status(401).json({message: 'Unauthorized'})
      }
    } catch (error) {
      console.log('error', error);
      response.send(error)
    }
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const currentUser = auth.use('api').user

      if (currentUser) {
        const post = await Post.create({ ...request.only(['title', 'published', 'content']), userId: currentUser?.id })

        response.status(201).json(post)
      } else {
        response.status(401).json({message: 'Unauthorized'})
      }
    } catch (error) {
      response.send(error)
    }
  }

  public async show({ params, response, auth }: HttpContextContract) {
    try {
      const currentUser = auth.use('api').user
      if (currentUser) {
        const post = await Post.query().where('userId', currentUser.id).where('id', params.id).first()

        response.status(200).json(post)
      }
    } catch (error) {
      response.status(error.status).send(error)
    }
  }

  public async update({ params, response, request, auth }: HttpContextContract) {
    try {
      const currentUser = auth.use('api').user
      if (currentUser) {
        const post = await Post.query().where('userId', currentUser.id).where('id', params.id).first()
        await post?.merge({ ...request.only(['title', 'published', 'content']) }).save()

        response.status(200).json(post)
      }
    } catch (error) {
      response.status(error.status).send(error)
    }
  }

  public async destroy({ params, response, auth }: HttpContextContract) {
    try {
      const currentUser = auth.use('api').user
      if (currentUser) {
        const post = await Post.query().where('userId', currentUser.id).where('id', params.id).first()
        await post?.delete()

        response.status(204)
      }
    } catch (error) {
      response.status(error.status).send(error)
    }
  }
}
