  import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.get('/employee/upload', 'FilesController.index')
    Route.get('/employee/upload/:id', 'FilesController.show')
    Route.post('/employee/upload', 'FilesController.store')
}).namespace('App/Controllers/Http')