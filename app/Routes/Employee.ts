import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.get('/employee', 'EmployeesController.index')
    Route.get('/employee/:id', 'EmployeesController.show')
    Route.post('/employee', 'EmployeesController.store')
    Route.put('/employee/:id', 'EmployeesController.update')
    Route.delete('/employee/:id', 'EmployeesController.destroy')
}).namespace('App/Controllers/Http')