const mongoose= require('mongoose');
const Joi= require('joi');

//schema
const customerSchema= new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required:true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

//model
const Customer= mongoose.model('customers', customerSchema);

function validateCustomer(customer) // ?check if res can be used in a function
{
    const schema={
        isGold: Joi.boolean(), //.default("false")
        name: Joi.string().min(5).max(50).required(),
        phone:Joi.string().min(5).max(50).required()
    };
    return Joi.validate(customer, schema);

}

exports.Customer= Customer;
exports.validate= validateCustomer;