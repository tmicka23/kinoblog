/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { welcome: 'to the Kinoblog ! An API that reports kinobabos news 🎉' }
})

Route.post('/accounts', 'AccountsController.store')
Route.post('/login', 'SessionsController.login')

Route.group(() => {
  Route.delete('/logout', 'SessionsController.logout')

  Route.get('/accounts/me', 'AccountsController.show')
  Route.put('/accounts/me', 'AccountsController.update')
  Route.delete('/accounts/me', 'AccountsController.destroy')

  Route.resource('posts', 'PostsController').only(['index', 'store', 'show', 'update', 'destroy'])
}).middleware(['auth'])
