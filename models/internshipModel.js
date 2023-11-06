const mongoose = require("mongoose");
const internshipModel = new mongoose.Schema({
    students :    [{ type: mongoose.Schema.Types.ObjectId, ref: 'student' }],
    employe :    { type: mongoose.Schema.Types.ObjectId, ref: 'employe' },
    profile: String,
    skill: String,
    internshiptype: {
        type: String,
        enum: ["In office", "Remote"]
    },
    openings: Number,
    from: String,
    to: String,
    duration: String,
    responsibility: String,
    stipend: {
        status: {
            type: String,
            enum: ["Fixed", "Negotiable", "Performance Based", "Unpaid"]
        },
        amount : Number,
    },
    perks : String,
    assesments : String,
    
},

    { timestamps: true }
);

internshipModel.pre("save", function () {
    if (!this.isModified("password")) {
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});

const Internship = mongoose.model("internship", internshipModel);
module.exports = Internship;