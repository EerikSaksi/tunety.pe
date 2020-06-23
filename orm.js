const { Sequelize } = require('sequelize');
  auth: {
    tokenHost: 'https://api.genius.com'
  }
const DataTypes = require('sequelize/lib/data-types');

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
const SyncedLyrics = sequelize.define('SyncedLyric', {
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
const SyncedLyrics = sequelize.define('ManySyncedLyrics', {
  videoID : {
    type: DataTypes.STRING, 
    primaryKey: true
  }
});

SyncedLyrics.hasMany(SyncedLyric, {
  foreignKey: 'videoID'
})

sequelize.sync({force:true})
exports.ManySyncedLyrics = ManySyncedLyrics
exports.SyncedLyric = SyncedLyric
