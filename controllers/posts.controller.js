const Post = require("../models/posts.model");

function getWritePost(req,res) {
  res.render('write');
}

async function writePost(req,res) {
  try {
    // 요청 정보 로그 출력
    // console.log(req.body);

    // 요청한 title, content 받기
    const {title, content} = req.body;
    const {username} = req.user;

    // index를 넣기 위해 postCount
    const postsLength = await Post.countDocuments({}) || 0;

    // Post 객체 생성
    const post = new Post({
      index: postsLength + 1,
      username: username,
      title: title,
      content: content
    })

    // DB에 저장
    const savedPost = await post.save();

    // 저장한 객체 정보 보기
    // console.log(savedPost);
    

    // 성공적으로 저장되었음을 클라이언트에 전달
    const msg = '게시글이 작성되었습니다';
    res.redirect('/')
  }
  catch (error) {
    console.log(error);
    const msg = '게시글 작성에 실패했습니다'
    res.status(500).render('index', {msg})
  }
}

async function viewContent(req,res) {
  const index = req.params.index;

  const post = await Post.findOne({index: index});
  if (!post) {
    const msg = '게시글을 찾을 수 없습니다';
    res.status(500).render('index', {msg});
  }
  res.render('viewContent', {post});
}

async function deletePost(req,res) {
  const index = req.params.index;
  if (!index) {
    res.status(100).render('index');
  } 
  try {
    await Post.deleteOne({index: index})

    res.status(200).render('index');
  }
  catch (err) {
    res.status(500).render('index')
  }
}


module.exports = {
  getWritePost,
  writePost,
  viewContent,
  deletePost
}