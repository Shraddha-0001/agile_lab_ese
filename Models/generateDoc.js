const { text } = require('body-parser');
const mongoose=require('mongoose');
const Schema=mongoose.Schema

const generateDoc=new Schema({
    date:{
        type: String,
        required: true
    },
    sports:{
        type: String,
        required: true
    },
    level:{
        type: String,
        required: true
    },
    pcount:{
        type: String,
        required: true
    },
    qcount:{
        type: String,
        required: true
    },
    goldcount:{
        type: Number,
        required: true
    },
    silvercount:{
        type: Number,
        required: true
    },
    bronzecount:{
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    playername:{
        type: String,
        required: true
    },
    classnm:{
        type: String,
        required: true
    }

});

const generateDocuments=mongoose.model('generateDocuments',generateDoc);

module.exports=generateDocuments;