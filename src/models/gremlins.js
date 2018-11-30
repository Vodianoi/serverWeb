module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Gremlin', {
        name: DataTypes.STRING,
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },

        taille: DataTypes.INTEGER
    });

};