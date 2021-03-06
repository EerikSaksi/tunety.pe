const { Sequelize } = require('sequelize');
const DataTypes = require('sequelize/lib/data-types');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve('db.sqlite'),
  logging: false,
  define: {
    freezeTableName: true,
  },
  query: {
    raw: true
  }
});
async function connection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
connection();
const SyncedLyric = sequelize.define('SyncedLyric', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  youtubeID: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  geniusID: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  userName: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

const SynchronizationData = sequelize.define('SynchronizationData', {
  youtubeID: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  geniusID: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  artistName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  songName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imgUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

const User = sequelize.define('User', {
  googleID: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

const CachedLyrics = sequelize.define('CachedLyrics', {
  geniusID: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  lyrics: {
    type: DataTypes.STRING,
  },
  wordCount: {
    type: DataTypes.INTEGER,
  },
});

const GameStats = sequelize.define('GameStats', {
  creatorUserName: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'User',
      key: 'userName'
    }
  },
  playerUserName:{
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'User',
      key: 'userName'
    }
  },
  youtubeID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  geniusID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  wordsPerMinute: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  accuracy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
})

//one synchronization has many individually synced lyrics
SynchronizationData.hasMany(SyncedLyric, {
  foreignKey: 'youtubeID',
  foreignKey: 'geniusID',
  foreignKey: 'userName'
});

//every synchronization can have one cache at most
SynchronizationData.hasOne(CachedLyrics, {
  foreignKey: 'geniusID',
});

//force if testing
sequelize.sync({ force: process.env.JEST_WORKER_ID ? true : false });

exports.SynchronizationData = SynchronizationData;
exports.SyncedLyric = SyncedLyric;
exports.User = User;
exports.CachedLyrics = CachedLyrics;
exports.GameStats = GameStats
