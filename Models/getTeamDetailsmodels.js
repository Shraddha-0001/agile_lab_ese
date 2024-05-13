const { text } = require('body-parser');
const mongoose=require('mongoose');
const Schema=mongoose.Schema


const getTeamDetailSchema=new Schema({
    tname:{
        type: String,
        required: true
    },
    sports:{
        type:String,
        required: true
    },


    playerName:{
      type:[String]
    }
        


});

const getTeamDetails=mongoose.model('getTeamDetails',getTeamDetailSchema);

module.exports=getTeamDetails;