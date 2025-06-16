const { default: mongoose } = require("mongoose");

const TweetsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
    },
    body:{
        type: String,
        required: true,
    },
    reactions:[{
        likes:{
            type: Number,
            default: 0,    
        },
        dislikes:{
            type: Number,
            default: 0,
        }
    }],
    tags:[{
        type: String,
    }],
    createdBy:[{type:mongoose.Schema.Types.ObjectId,ref:"UserModel"}]
},{timestamps: true});

const TweetsModel = mongoose.models.tweets || mongoose.model('tweets',TweetsSchema)

export default TweetsModel;