const express = require("express");
const cors = require("cors");
const fs = require("fs");
// MySQL DB 연동
const { sequelize } = require('./models');

const {
    article,
    topic,
    comment,
    user,
} = require("./router");

const app = express();
const PORT = 8080;
const SECRET = "SESAC";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// JWT 시크릿 설정
app.set("jwt-secret", SECRET);

// 서버 상태 확인
app.get("/", (req, res) => {
    res.send("Success !!");
});

sequelize.sync({force: false}).then(()=>{
    console.log("DB 연동 성공");
}).catch((err)=>{
    console.log("DB 연동 실패 :", err);
});

// API
app.use(article);
app.use(topic);
app.use(comment);
app.use(user);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`http://localhost:${PORT} 로 연결 중입니다.`);
})