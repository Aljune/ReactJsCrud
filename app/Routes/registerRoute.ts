import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.post('/employee/registration', 'RegistersController.create')
    Route.post('/employee/test', 'RegistersController.store')
    Route.post('/employee/logout/', 'RegistersController.logout')
    Route.post('/employee/login', 'RegistersController.login')
    Route.get('/employee/token', 'RegistersController.token')
}).namespace('App/Controllers/Http')