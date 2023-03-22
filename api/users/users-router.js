const express = require('express');
const {
  logger,
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware.js");
const User = require("./users-model.js");
const Post= require("../posts/posts-model.js");

// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir

const router = express.Router();

router.get('/',async (req, res) => {
  // TÜM KULLANICILARI İÇEREN DİZİYİ DÖNDÜRÜN
  const users=await User.get();
  try {
    res.json(users)
  } catch (error) {
    res.status(500).json({message:"Kullanıcı bilgileri alınamadı"})
  }
});

router.get('/:id',validateUserId, (req, res) => {
  // USER NESNESİNİ DÖNDÜRÜN
  // user id yi getirmek için bir ara yazılım gereklidir
  try {
    res.json(req.user) //req.user middleware validateUserId den geldi
  } catch (error) {
    res.status(500).json({message:"Kullanıcılar alınamadı"})
  }
});

router.post('/',validateUser, async (req, res) => {
  // YENİ OLUŞTURULAN USER NESNESİNİ DÖNDÜRÜN
  // istek gövdesini doğrulamak için ara yazılım gereklidir.
  try {
    let newUser=await User.insert(req.body)
    res.json(newUser)
  } catch (error) {
    res.status(500).json({message:"Kullanıcı eklenemedi"})
  }
});

router.put('/:id',validateUser,validateUserId,async (req, res) => {
  // YENİ GÜNCELLENEN USER NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan ara yazılım gereklidir
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  try {
    let {id}=req.params
    let updatingData=req.body 
    let updatedUser=await User.update(id,updatingData)
    res.json(updatedUser)
  } catch (error) {
    res.status(500).json({message:"Kullanıcı güncellenemedi"})
  }
});

router.delete('/:id',validateUserId,async (req, res) => {
  // SON SİLİNEN USER NESNESİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    let {id}=req.params
    let removedUser=await User.getById(id)
    await User.remove(id)
    res.json(removedUser)
  } catch (error) {
    res.status(500).json({message:"Kullanıcı silinemedi"})
  }
});

router.get('/:id/posts',validateUserId,async (req, res) => {
  // USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    let {id}=req.params
    let post=await User.getUserPosts(id)
    res.json(post)
  } catch (error) {
    res.status(500).json({message:"Kullanıcı gönderisi bulunmadı"})
  }
});

router.post('/:id/posts',validateUserId,validatePost,async (req, res) => {
  // YENİ OLUŞTURULAN KULLANICI NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  try {
    let newPost=await Post.insert({user_id:req.params.id,text:req.body.text})
    res.json(newPost)
  } catch (error) {
    res.status(500).json({message:"Gönderi dbye eklenemedi"})
  }
    
});

// routerı dışa aktarmayı unutmayın

module.exports=router;
