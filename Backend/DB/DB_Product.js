const { default: mongoose } = require("mongoose");


const { Schema } = mongoose


const products = new Schema({

    ProductName: {
        type: String,
        required: true

    },
    BrandName: {
        type: String,
        required: true

    },
    Category: {
        type: String,
        required: true

    },
    Description: {
        type: String,
        required: true

    },
    Price: {
        type: Number,
        required: true

    },
    StockQuantity: {
        type: Number,
        required: true

    },
    // ProductImages: {
    //     type: String,
    //     required: true

    // },
    BatteryCapacity: {
        type: String,
        required: true

    },
    DisplayType: {
        type: String,
        required: true

    },
    StrapMaterial: {
        type: String,
        required: true

    },
    WaterResistance: {

        type: String,
        required: true

    },
    Warranty: {
        type: String,
        required: true

    }


})

const productSchema = mongoose.model("Products", products);
module.exports = productSchema;

