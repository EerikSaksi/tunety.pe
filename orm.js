const {Sequelize} = require('sequelize');
const DataTypes = require('sequelize/lib/data-types');

const sequelize = new Sequelize('sqlite::memory:', {
  logging: false
})
async function connection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
connection()
const SyncedLyric = sequelize.define('SyncedLyric', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  youtubeID: {
    type: DataTypes.STRING,
  },
  geniusID: {
    type: DataTypes.STRING,
  },
  text: {
    type: DataTypes.STRING,
  },
  time: {
    type: DataTypes.FLOAT
  }
});
const SynchronizationData = sequelize.define('SynchronizationData', {
  youtubeID: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  geniusID: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  artistName: {
    type: DataTypes.STRING,
  },
  songName: {
    type: DataTypes.STRING,
  },
  youtubeTitle: {
    type: DataTypes.STRING,
  }
});

SynchronizationData.hasMany(SyncedLyric, {
  foreignKey: 'youtubeID',
  foreignKey: 'geniusID'
})

sequelize.sync({force: true})
exports.SynchronizationData = SynchronizationData
exports.SyncedLyric = SyncedLyric
