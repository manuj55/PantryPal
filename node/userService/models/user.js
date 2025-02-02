const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6
    },
    phoneNumber: {
        type: String,
    },
    address: {
        type: String,
    },
    country: {
        type: String,
    }, isVerified: {
        type: Boolean,
        default: false
    }
});



//Pre save hook to hash the password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})

// Method to compare provided password with the stored hashed password
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

//create a user model 
const User = mongoose.model('User', userSchema);

module.exports = User;