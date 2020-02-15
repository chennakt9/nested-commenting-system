const mongoose = require('mongoose');


const CommentSchema = new mongoose.Schema({
  parent_comment_id: {
    type: String,
  },
  comment: {
    type: String,
  },
  comment_sender_name: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;