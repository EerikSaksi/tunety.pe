const { Sequelize } = require('sequelize');
const DataTypes = require('sequelize/lib/data-types');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, 'db.sqlite'),
  logging: false,
  define: {
    freezeTableName: true
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
  googleID: {
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
  googleID: {
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
  searchResult: {
    type: Sequelize.VIRTUAL,
    get() {
      return User.findOne({ where: { googleID: this.getDataValue('googleID') } }).then((user) => {
        return {
          imgUrl: this.getDataValue('imgUrl'),
          text: `${this.getDataValue('artistName')} - ${this.getDataValue('songName')}`,
          forwardingUrl: `/play/${user.userName}/${this.getDataValue('youtubeID')}/${this.getDataValue('geniusID')}`,
          duration: this.getDataValue('endTime') - this.getDataValue('startTime'),
        };
      });
    },
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
    get() {
      if (this.getDataValue('lyrics')){
        return this.getDataValue('lyrics').split('\n');
      }
    },
  },
  wordCount: {
    type: DataTypes.INTEGER,
  },
});

const GameStats = sequelize.define('GameStats', {
  creatorGoogleID: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'User',
      key: 'googleID'
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
  playerGoogleID:{
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'User',
      key: 'googleID'
    }
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
  foreignKey: 'googleID'
});

//every synchronization can have one cache at most
SynchronizationData.hasOne(CachedLyrics, {
  foreignKey: 'geniusID',
});

sequelize.sync({ force: false });

exports.SynchronizationData = SynchronizationData;
exports.SyncedLyric = SyncedLyric;
exports.User = User;
exports.CachedLyrics = CachedLyrics;
exports.GameStats = GameStats
