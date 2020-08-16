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
    allowNull: false,
    primaryKey: true,
  },
  youtubeID: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  geniusID: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  googleID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
});
const SynchronizationData = sequelize.define('SynchronizationData', {
  googleID: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  youtubeID: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  geniusID: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  artistName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  songName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imgUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startTime: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  endTime: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  searchResult: {
    type: Sequelize.VIRTUAL,
    get () {
      return {
        imgUrl: this.getDataValue('imgUrl'),
        text: `${this.getDataValue('artistName')} - ${this.getDataValue('songName')}`,
        forwardingUrl: `play/${this.getDataValue('youtubeID')}/${this.getDataValue('geniusID')}`,
        duration: this.getDataValue('endTime') - this.getDataValue('startTime') 
      }
    }
  }
});

const User = sequelize.define('User', {
  googleID: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  userName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
});

SynchronizationData.hasMany(SyncedLyric, {
  foreignKey: 'youtubeID',
  foreignKey: 'geniusID'
})

User.hasMany(SynchronizationData, {
  foreignKey: 'googleID'
})

sequelize.sync({
  force: true
})

exports.SynchronizationData = SynchronizationData
exports.SyncedLyric = SyncedLyric
exports.User = User
