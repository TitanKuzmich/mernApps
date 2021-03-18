const {Router} = require('express')
const Data = require('../models/Data')
const router = Router()

const algos = require('../utils/algorithms')
// const strf = require('../utils/algorithms/strf')

const helpers = require('../utils/helper')
// const calcStats = require('../utils/helper/calcStats')

// /api/data/add
router.post(
    '/add',
    async(req, res) => {
    try{
        const {name, data, withTrace} = req.body

        console.log(name)
        const candidate = await Data.findOne({ name })

        if(candidate){
            return res.status(400).json({ message: 'Такое название существует! Придумайте другое или переименйте загружаемый файл' })
        }

        const dataSet = new Data({ name, data })
        await dataSet.save()

        const fifoData = helpers.processArray(algos.fifo(data), withTrace)
        const fifoStats = helpers.calcStats(fifoData)
        const strfData = helpers.processArray(algos.strf(data), withTrace)
        const strfStats = helpers.calcStats(strfData)

        res.status(201).json({message: 'Моделирование успешно!', fifoData, fifoStats, strfData, strfStats})

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