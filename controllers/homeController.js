const mongoose = require('mongoose');
const PostModel = mongoose.model('Post');

exports.index = async (req, res) => {
  
  const currentTagQuery = req.query.t;
  const filterByTags = {
    ...currentTagQuery && {tags: currentTagQuery}
  }
  
  let tagsPromise = PostModel.getTagsList();
  const postsPromise = PostModel.findPosts(filterByTags);

  const [tags, posts] = await Promise.all([tagsPromise, postsPromise])
  
  tags.forEach((tag, i) => {
    if (tag._id === currentTagQuery) {
      tags[i].class = 'selected'
    }
  });
  
  res.render('home', {
    posts,
    tags, 
  });
}