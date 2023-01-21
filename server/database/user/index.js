import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String },
        address: [{ detail: { type: String, }, for: { type: String } }],
        phoneNumber: [{ type: Number }]

    },

    {
        timestamps: true
    }
);

// attachments
UserSchema.methods.generateJwtTocken = function () {
    console.log(jwt.sign({ user: this._id.toString() }, "ZomatoApp"));
    return jwt.sign({ user: this._id }, "ZomatoApp");
};


// helper functions
UserSchema.statics.findByEmailAndPhone = async (email, phoneNumber) => {
    const checkUserByEmail = await UserModel.findOne({ email });
    const checkUserByPhone = await UserModel.findOne({ phoneNumber });

    if (checkUserByEmail || checkUserByPhone) {
        throw new Error("User Already Exists!!")
    }
    return false;
};

UserSchema.statics.findByEmailAndPassword = async (email, password) => {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User dosen't exist!!");

    // Compare Password
    const dosePasswordMatch = await bcrypt.compare(password, user.password);
    if (!dosePasswordMatch) throw new Error("Invalid Cradentials");

    return user;

};

UserSchema.pre("save", function (next) {
    const user = this;

    // Password has been modified or not
    if (!user.isModified('password')) return next();
    // generate bcrypy n salt
    bcrypt.genSalt(8, (error, salt) => {
        if (error) return next(error);
    });

    // hash the password for 8 times
    bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) return next(error);
        // will be assigning hashed password back
        user.password = hash;
        return next();
    })

});

export const UserModel = mongoose.model("users", UserSchema);
