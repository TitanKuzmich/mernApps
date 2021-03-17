const {Router} = require('express')
const config = require('config')
const Data = require('../models/Data')
const router = Router()

// /api/data/add
router.post(
    '/add',
    async(req, res) => {
    try{
        const {name, data} = req.body

        const candidate = await Data.findOne({ name })

        if(candidate){
            return res.status(400).json({ message: 'Такое название существует!' })
        }

        const dataSet = new Data({ name, data })

        await dataSet.save()

        res.status(201).json({message: 'Данные сохранены'})

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

// /api/data/remove
router.post(
    '/remove',
    async(req, res) => {
    try{
        const {name} = req.body

        const candidate = await Data.findOneAndDelete({ name })

        if(!candidate){
            return res.status(400).json({ message: 'Такого набора данных не существует' })
        }

        await candidate.save()

        res.status(201).json({message: 'Данные удалены'})

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router