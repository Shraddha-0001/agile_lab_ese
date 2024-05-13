const { text } = require('body-parser');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const viewDoc=new Schema({
    ddlYears:{
        type: String,
        required: true
    },
    month:{
        type: String,
        required: true
    }
});


const viewDocument=mongoose.model('viewDoc',viewDoc);

module.exports=viewDocument;