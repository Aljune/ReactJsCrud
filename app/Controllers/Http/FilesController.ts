import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import { DateTime } from 'luxon'
import Application from '@ioc:Adonis/Core/Application'
import File from 'App/Models/File'

export default class EmployeeUploadsController {


    public async store({ request, response }: HttpContextContract) {
        const files = request.file("banner")

        const folderName = DateTime.now()

        if (!files) return response.status(422).json({ message: 'file is missing' })

        await files.move(Application.tmpPath(`uploads/${folderName}`))

        const uploadDrive = await Drive.getUrl(`${folderName}/${files?.clientName}`)

        const file = await File.create({
            url: uploadDrive
        })

        return response.send({
            file
        })
    }
}