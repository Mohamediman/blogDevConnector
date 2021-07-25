const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: [true, 'Please provide an email address'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email address']
        },
        password: {
            type: String,
            required: [true, 'Please Provide a password for your account'],
            minLength: [6, 'The passwords should have at leat 6 characters'],
            select: false
        },
        confirmPassword: {
            type: String,
            required: [true, 'Please confirm the  password'],
            validate: {
                validator: function(el){
                    return el === this.password;
                },
                message: 'Passwords must be the same:'
            }
        },

        date: {
            type: Date,
            default: Date.now()
        }
})

//=== doc pre-save hook to hash the password
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    //this.confirmPassword = undefined

    next();
})

//====check if the password is correct using Instance method
userSchema.methods.correctPassword = async function(userInputPassword, DBPassword){
    return await bcrypt.compare(userInputPassword, DBPassword);
}

const User = mongoose.model('User', userSchema);

module.exports = User;