const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({

    hostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    hostUsername: { 
        type: String,
        required: true
    },

    config: {
        nRounds: {
            type: Number,
            required: true,
            default: 3 
        },
        answerTime: {
            type: Number,
            required: true,
            default: 10
        }
    },

    players: [
        {
        user: { type: mongoose.Schema.Types.ObjectId, 
            ref: "User" },
            username: { 
                type: String 
            },
            score: { 
                type: Number, 
                default: 0 
            },
            isWinner: { 
                type: Boolean, 
                default: false 
            }
        }
    ],
},
    {timestamps:true}
);

module.exports = mongoose.model("Game", GameSchema);