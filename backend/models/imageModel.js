const mongoose = require('mongoose');

const imageSchema=new mongoose.Schema({
    image:{
        type:String
    },

user:{
    type: String
}
}
);
imageSchema.methods.toJSON=function () {
    const result=this.toObject;
    delete result.image;
    return result
};
module.exports = mongoose.model('images',imageSchema);
