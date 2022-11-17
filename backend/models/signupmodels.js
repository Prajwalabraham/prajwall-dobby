const mongoose = require('mongoose')
const signupTemplate = new mongoose.Schema({
                                                                                      
        username:{
          type: String
        },                                                                                                    
        password:{
          type: String
        },
                                                                                                                                                                    
        email:{
          type: String
        },                                                                                                 

    Date:{
        type:Date,
        default:Date.now
    }
    
})

module.exports = mongoose.model('users', signupTemplate)