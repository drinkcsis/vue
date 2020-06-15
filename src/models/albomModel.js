import { Model, ArrayModel } from 'objectmodel';

const AlbomModel = Model({
    id: [Number, null],
    title: String,
    description: String,
    preview_photo: String
}).defaultTo({
    id: null,
    description: '',
    preview_photo: ''
})

const AlbomCollection = ArrayModel(AlbomModel)

export { AlbomModel, AlbomCollection }