const {Sequelize} = require('sequelize');
const DataTypes = require('sequelize/lib/data-types');

const sequelize = new Sequelize('sqlite::memory:')
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
  videoID: {
    type: DataTypes.STRING,
    primaryKey: true
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
const ManySyncedLyrics = sequelize.define('ManySyncedLyrics', {
  videoID: {
    type: DataTypes.STRING,
    primaryKey: true
  }
});

ManySyncedLyrics.hasMany(SyncedLyric, {
  foreignKey: 'videoID'
})

sequelize.sync({force: true})
exports.ManySyncedLyrics = ManySyncedLyrics
exports.SyncedLyric = SyncedLyric
