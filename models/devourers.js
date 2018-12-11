module.exports = function(sequelize, DataTypes) {

    var devourers = sequelize.define('devourers', {
      devourer_name: DataTypes.STRING
    });

    devourers.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      devourers.belongsTo(models.burgers, {
        foreignKey: {
          allowNull: false
        }
      });
    };

    return devourers;
}