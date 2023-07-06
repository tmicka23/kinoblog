import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Post from 'App/Models/Post'

export default class PostFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Post, Post>

  public published (value: any): void {
    switch (value) {
      case 'true':
        this.$query.where('published', true)
        break
      case 'false':
        this.$query.where('published', false)
        break
      default:
        this.$query
        break;
    }
  }
}
