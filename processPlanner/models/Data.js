const {Schema, model, Types} = require('mongoose')

const stringSchema = new Schema({
    id: {type: Number, required: true},
    readyTime: {type: Number, required: true},
    workTime: {type: Number, required: true},
    prior: {type: Number, required: true}
})

const dataSet = new Schema({
    name: {type: String, required: true, unique: true},
    data: [stringSchema]
})

module.exports = model('DataSet', dataSet)