const mongoose = require('mongoose')

const bakedGoodSchema = new mongoose.Schema({
    Thumbnail: {
        type: String,
        required: [true, "item needs a thumbnail for page"]
    },
    Baked_Name: {
        type: String,
        required: [true, "item needs a name"]
    },
    Item_Description: {
        type: String,
        required: [true, "item needs a desctription"]
    },

    Different_varients: [
        {
            Variation_name: {
                type: String,
                required: [true, "item needs a name"]
            },
            Prices: [
                {
                    Quantity: {
                        type: Number,
                        required: true
                    },
                    Cost: {
                        type: Number,
                        required: [true, "Items need a price on it"]
                    }
                }
            ],
            Different_Allergens: [
                {
                    Allergen_Name: {
                        type: String,
                        required: [true, "item needs a list of allergies that the product may have"]
                    },
                    Can_Remove: {
                        type: Boolean
                    }
                }
            ],
            Unit: {
                type: String,
                required: [true, "needs a unit of messurement"]
            }
        }
    ],

    Season: {
        type: String,
        required: [true, "needs to know what season a product is or if no season than put No-Season"]
    },
    Catagory: {
        type: String,
        required: [true, "item needs a cotagory of baked gooks like cookie or cake"]
    }
})

const Baked_Goods = mongoose.models.baked_goods || mongoose.model("baked_goods", bakedGoodSchema)

export default Baked_Goods;