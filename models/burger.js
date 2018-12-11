module.exports = function(sequelize, DataTypes) {

  var burgers = sequelize.define('burgers', {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  burgers.associate = function(models) {
    burgers.hasOne(models.devourers, {
      onDelete: "cascade"
    });
  };

  return burgers;
}
