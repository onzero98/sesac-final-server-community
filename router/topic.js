const express = require("express");
const router = express.Router();
const Models = require('./../models');
const Topic = Models.Topic;

// 토픽 등록
router.post("/api/topic/register", async (req, res) => {
    const post = {
        title: req.body.title,
        url: req.body.url,
    };

    const newTopic = await new Topic(post).save();
    res.send(newTopic);
});

// 토픽 불러오기 (글 쓸때 사용)
router.get("/api/topic/getAll", async (req, res) =>{
    const topics = await Topic.findAll({
        order: [['createdAt', 'ASC']],
    });
    res.send(topics);
});

// 개별 토픽 불러오기 (게시글에서 사용)
router.get("/api/topic/getOne", async (req, res) =>{
    const topics = await Topic.findAll({
        order: [['createdAt', 'ASC']],
    });
    res.send(topics);
});

module.exports = router;