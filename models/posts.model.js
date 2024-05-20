const mongoose = require('mongoose');

// Date Format
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1 더함
  const day = ('0' + date.getDate()).slice(-2);
  
  return `${year}-${month}-${day}`;
};

// Posts Schema
const PostsSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true,
    unique: true // Unique 설정 추가
  },
  username: {
    type: String,
    required: true,
    minlength: 3, // 최소 길이 설정
    maxlength: 50 // 최대 길이 설정
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  content: {
    type: String,
    required: true,
    minlength: 10
  },
  date: {
    type: String,
    default: formatDate(new Date())
  }
});

const Post = mongoose.model('Post', PostsSchema);

module.exports = Post