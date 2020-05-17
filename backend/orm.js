const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:') 
async function connection(){
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connection()

const Caption = sequelize.define('Typeable', {
  videoID: {
    type: DataTypes.STRING,
    primaryKey:true
  },
  text: {
    type: DataTypes.STRING,
  },
  dur: {
    type: DataTypes.FLOAT
  },
  sleepAfter: {
    type: DataTypes.INTEGER
  },
  horizontalPosition: {
    type: DataTypes.INTEGER
  }

});
const VideoCaptions = sequelize.define('VideoCaptions', {
  videoID : {
    type: DataTypes.STRING, 
    primaryKey: true
  }
});

VideoCaptions.hasMany(Caption, {
  foreignKey: 'videoID'
})
module.exports = [VideoCaptions, Caption]
