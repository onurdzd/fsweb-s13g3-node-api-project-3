const express=require("express")
const Post= require("../posts/posts-model.js");
const router=express.Router()

router.get('/',async (req, res) => {
    const posts=await Post.get();
    try {
      res.json(posts)
    } catch (error) {
      res.status(500).json({message:"Kullanıcı gönderileri alınamadı"})
    }
  });

module.exports=router;