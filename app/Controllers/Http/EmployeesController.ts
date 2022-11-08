import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employee from 'App/Models/Employee'
import EmployeeValidator from 'App/Validators/EmployeeValidator'


export default class EmployeesController {
    public async index({request, response}: HttpContextContract){
        // await Employee.query().where({id: 1}).orderBy('id', 'desc').paginate(4, 10)
        
        const page = request.input('page', 1)
        const limit = request.input('limit', 10)
        const employee = await Employee.query().preload('file').orderBy('last_name', 'asc').paginate(page, limit)

        // Sort data of employee
        
        // console.log(employee,'employeedata')
        return response.status(200).json(employee)
    }

    public async show({response, params} : HttpContextContract){
        const employee = await Employee.query().where('id', params.id).first()
        
        return response.status(200).json(employee)
    }

    public async store({request, response}: HttpContextContract){
        const validated = await request.validate(EmployeeValidator)
        // const coverImage = request.file('cover_image')

        // const pathName = DateTime.now()
        // if (coverImage) {
        //     await coverImage.move(Application.tmpPath('uploads/'+pathName))


        // }


        console.log(validated)
       const employee = await Employee.create({
            firstName: validated.first_name,
            lastName: validated.last_name,
            birthdate: validated.birthdate,
            gender: validated.gender,
            maritalStatus: validated.marital_status,
            department:validated.department,
            position: validated.position,
            dateHired: validated.date_hired,
            employmentStatus: validated.employment_status,
            contactNumber: validated.contact_number,
            email: validated.email,
            address: validated.address,
            city: validated.city,
            province: validated.province,
            nationality: validated.nationality,
            fileId: validated.cover_id
        })
      

        // const employees = await Employee.createMany([{
        //     firstName: validated.first_name
        // }, {firstName: 'asdsad'}])


        
        return response.status(200).json(employee)

    }

    public async update({request, response, params}: HttpContextContract){
        const validated = await request.validate(EmployeeValidator)
        
        // const data = request.only([
        //     "first_name",
        // "last_name",
        // "birthdate",
        // "gender",
        // "marital_status",
        // "department",
        // "position",
        // "date_hired",
        // "employment_status",
        // "contact_number",
        // "email",
        // "address",
        // "city",
        // "nationality"
        // ])
          const employee = await Employee.findOrFail(params.id)

          employee.merge(validated)
  
          await employee.save()
      
          return response.status(200).json(employee)

    }

    public async destroy({response, params}: HttpContextContract){
        const employee = await Employee.findOrFail(params.id)

        await employee.delete()
        return response.status(200).json(employee)
    }
}
