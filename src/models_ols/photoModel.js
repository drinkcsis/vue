import { Model, ArrayModel } from 'objectmodel';

const PhotoModel = Model({
    id: [Number, null],
    albom_id: Number,
    urls: {
        origin_url: String,
        small: String
    }
}).defaultTo({
    id: null,
    urls: {
        origin_url: '',
        small: ''
    }
})

const PhotoCollection = ArrayModel(PhotoModel)

export { PhotoModel, PhotoCollection }