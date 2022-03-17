const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Models = require('./../models');
const User = Models.User;

// 로그인
router.post("/api/user/login", async (req, res) => {

    const loginUser = await User.findOne({ where: { userid: req.body.userid } });
    if (loginUser) {
        const password_valid = await bcrypt.compare(req.body.password, loginUser.password);
        if (password_valid) {
            const secret = req.app.get("jwt-secret");
            const token = jwt.sign(
                {
                    id: loginUser.id,
                    userid: loginUser.userid,
                    nickname: loginUser.nickname,
                },
                secret,
                {
                    expiresIn: "1d",
                    issuer: "sesac",
                    subject: "auth",
                }
            );
            res.send({
                userid: loginUser.userid,
                nickname: loginUser.nickname,
                token: token,
                error: false,
                msg: "로그인 성공",
            });
        } else {
            return res.send({
                error: true,
                msg: "비밀번호 틀림",
            });
        }
    } else {
        return res.send({
            error: true,
            msg: "아이디 틀림",
        });
    }
});

// 로그아웃
// router.post("/api/user/logout", (req, res) => {

// });

// 회원가입
router.post("/api/user/register", async (req, res) => {

    const salt = await bcrypt.genSalt(10);

    User.create({
        userid: req.body.userid,
        password: await bcrypt.hash(req.body.password, salt),
        nickname: req.body.nickname,
    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
});

// 사용자 정보 제공
router.get("/api/user/userinfo", (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.send(false);
    }
    const token = authorization.split(" ")[1];
    const secret = req.app.get("jwt-secret");
    jwt.verify(token, secret, (err, data) => {
        if (err) {
            res.send(err);
        }
        User.findOne({
            where: {nickname: data.nickname}
        }).then((result)=>{
            res.send({
                result
            })
        })
    });
});

// 사용자 확인
router.get("/api/user/verify", (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.send(false);
    }
    const token = authorization.split(" ")[1];
    const secret = req.app.get("jwt-secret");
    jwt.verify(token, secret, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.send({
            nickname: data.nickname,
        });
    });
});

module.exports = router;