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
    allowNull: false
  },
  geniusID: {
    type: DataTypes.STRING,
    allowNull: false
  },
  text: {
    type: DataTypes.STRING,
  },
  time: {
    type: DataTypes.FLOAT
  }
});
const SynchronizationData = sequelize.define('SynchronizationData', {
  googleId: {
    type: DataTypes.STRING,
    primaryKey: true
  },
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
  },
  startTime: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  endTime: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

const User = sequelize.define('User', {
  googleId: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true
  },
  userName: {
    type: DataTypes.STRING,
    unique: true
  },
});

SynchronizationData.hasMany(SyncedLyric, {
  foreignKey: 'youtubeID',
  foreignKey: 'geniusID'
})

User.hasMany(SynchronizationData, {
  foreignKey: 'googleId'
})

sequelize.sync({
  force: true
})
exports.SynchronizationData = SynchronizationData
exports.SyncedLyric = SyncedLyric
exports.User = User
