const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    link: String,
    status: { type: String, enum: ['Todo', 'Solved'], default: 'Todo' },
    isBookmarked: { type: Boolean, default: false },
    explanation: String,
    approaches: String,
    timeComplexity: String,
    spaceComplexity: String,
    tags: [String],
    code: String,
    dateAdded: { type: Date, default: Date.now },
    dateSolved: Date
});

// Transform _id to id for frontend compatibility
questionSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Question', questionSchema);
