const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    FirstName:{
        type: String,
        required: [true, "First Name is needed for contact"]
    },
    LastName:{
        type: String,
        required: [true, "Last name is needed for contact"]
    },
    City:{
        type: String,
        required: [true, "City is needed for contact"]
    },
    Email:{
        type: String,
        required: [true, "Email is needed for contact"]
    },
    Comments:{
        type: String,
        required: [true, "Comments are needed for contact"]
    },
    })
    
    const Contact = mongoose.model("Contact", ContactSchema)
    
    export default Contact;