const {Router} = require('express')
const dataSet = require('../models/Data')
const router = Router()

const algos = require('../utils/algorithms')
const helpers = require('../utils/helper')

// /api/data/add
router.post(
    '/add',
    async(req, res) => {
    try{
        const {name, data, withTrace} = req.body

        const candidate = await dataSet.findOne({ name })

        if(candidate){
            return res.status(400).json({ message: 'Такое название существует! Придумайте другое или переименйте загружаемый файл' })
        }

        const dataToMongo = new dataSet({ name, data })
        await dataToMongo.save()

        const fifoData = helpers.processArray(algos.fifo(data), withTrace)
        const fifoStats = helpers.calcStats(fifoData)
        const strfData = helpers.processArray(algos.strf(data), withTrace)
        const strfStats = helpers.calcStats(strfData)

        res.status(201).json({message: 'Моделирование успешно!', fifoData, fifoStats, strfData, strfStats})

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

// /api/data/process
router.post(
    '/process',
    async(req, res) => {
    try{
        const {name, withTrace} = req.body

        const candidate = await dataSet.findOne({ name })

        if(!candidate){
            return res.status(400).json({ message: 'Такого набора данных не существует' })
        }

        const fifoData = helpers.processArray(algos.fifo(candidate.data), withTrace)
        const fifoStats = helpers.calcStats(fifoData)
        const strfData = helpers.processArray(algos.strf(candidate.data), withTrace)
        const strfStats = helpers.calcStats(strfData)

        res.status(201).json({message: 'Моделирование успешно!', source: candidate.data, fifoData, fifoStats, strfData, strfStats})

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

// /api/data/all
router.get(
    '/all',
    async(req, res) => {
    try{

        const exists = await dataSet.find({}, {"name":1, "_id":0}).lean()

        res.json({exists})

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

// /api/data/remove
router.delete(
    '/remove',
    async(req, res) => {
    try{
        const {name} = req.body

        const candidate = await dataSet.findOneAndDelete({ name })

        if(!candidate){
            return res.status(400).json({ message: 'Такого набора данных не существует' })
        }

        res.status(201).json({message: 'Данные удалены'})

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router