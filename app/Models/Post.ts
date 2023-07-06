import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { kebabCase } from 'lodash'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import PostFilter from 'App/Models/Filters/PostFilter'

export default class Post extends compose(BaseModel, Filterable) {
  public static $filter = () => PostFilter

  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public slug: string

  @column()
  public published: boolean

  @column()
  public content: string

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static createSlug(post: Post): void {
    post.slug = kebabCase(post.title)
  }
}
