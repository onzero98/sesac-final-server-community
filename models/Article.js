module.exports = function(sequelize, DataTypes){

    const Article = sequelize.define('Article', {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true,},
        nickname: { type: DataTypes.STRING },
        title: { type: DataTypes.STRING, },
        content: { type: DataTypes.STRING, },
        topic: { type: DataTypes.STRING, },
        view: { type: DataTypes.INTEGER, },
        commentCount: { type: DataTypes.INTEGER, },
        ddabong: { type: DataTypes.INTEGER},
    },{
        charset: "utf8",            // 한국어 설정
        collate: "utf8_general_ci",
        tableName: "Article",       // 테이블 이름 정의
        timestamps: true,           // createAt, updateAt 활성화
        paranoid: true,             // deleteAt 옵션
    });

    return Article;
}