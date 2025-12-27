const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    value:{
        type:String,
        required:true,
        validate:{
            validator:function(v){
                if(this.contentType == "link"){
                    return /^https?:\/\/.+/.test(v);
                }
                return true;
            },
            message:"Invalid URL"
        }
    },
    contentType:{
        type:String,
        enum:["text","link"],
        required: true
    }
});
const postModel = mongoose.model("post",postSchema);

module.exports = postModel;