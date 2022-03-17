const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Models = require('./../models');
const Article = Models.Article;
const User = Models.User;

// 게시글 작성
router.post("/api/article/post", async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.send({
            error: true,
            msg: "토큰이 존재하지 않음",
        });
    }

    const token = authorization.split(" ")[1];
    const secret = req.app.get("jwt-secret");

    jwt.verify(token, secret, async(err, data)=>{
        if (err) {
            res.send(err);
        }
        const post = {
            nickname: data.nickname,
            title: req.body.title,
            content: req.body.content,
            topic: req.body.topic,
          };
        const newArticle = await new Article(post).save();
        User.increment({points: 100},{where: {userid: data.userid}})
        res.send(newArticle);
    })
});

// 10개 게시글 불러오기
router.get("/api/article/readAll", async (req, res) =>{
    const articles = await Article.findAll({
        order: [['createdAt', 'DESC']],
        limit: 10,
    });
    res.send(articles);
});

// 개별 게시글 불러오기
router.get("/api/article/readOne/:id", async (req, res) =>{

    const articles = await Article.findOne({
        where: {id: req.params.id}
    })
    res.send(articles);
});

module.exports = router;