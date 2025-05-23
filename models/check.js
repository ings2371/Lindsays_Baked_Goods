const mongoose = require('mongoose')

const checkOutSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: [true, "name is needed for order"]
    },
    Email:{
        type: String,
        required: [true, "email is needed for order"]
    },
    Date:{
        type: Date,
        required: [true, "Date is needed for order"]
    },
    pickUp:{
        type: String,
        required: [true, "a pickup location needs to be provided"]  
    },
    //has to be changed maybe, probably
    OrderItems:[{
        Name:{
            type: String,
            required: [true, "need to know item name"]
        },
        Quantity:{
            type: Number,
            required: [true, "has to have a quantity"],
            min: [1, 'a item needs to have atleast 1 for its quantity']
        },
        Price:{
            type: Number,
            required: [true, "there has to be a price on the item"]  
        }
    }],

    Comments:{
        type: String,
    },
    Total:{
        type: Number,
        required: [true, "a order must have a total"]  
    }
})

const CheckOut = mongoose.model("CheckOut", checkOutSchema)

export default CheckOut;