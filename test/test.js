var assert = require('assert');
const { createTestClient } = require('apollo-server-testing');
const server = require('../index');
const { SyncedLyric, SynchronizationData, User } = require('../orm');
const sampleSync = require('./sample_sync');
//kinda janky, but wait for server to be ready
before(function (done) {
  this.timeout(20000);
  setTimeout(done, 3000);
});
describe('user testing', async () => {
  before(async () => {
    const testUser = await User.findOne({
      googleID: '105395086988085655499',
      userName: 'Orek',
    });
    if (!testUser) {
      return User.create({
        googleID: '105395086988085655499',
        userName: 'Orek',
      });
    }
  });
  describe('userNameTaken', () => {
    it('should check correctly whether users exist or do not', async () => {
      const { query } = createTestClient(server);
      const USER_NAME_TAKEN = `
          query usernametaken($userName: String) {
            userNameTaken(userName: $userName)
          }
        `;
      var res = await query({
        query: USER_NAME_TAKEN,
        variables: { userName: 'Orek' },
      });
      assert.equal(res.data.userNameTaken, true);
      res = await query({
        query: USER_NAME_TAKEN,
        variables: {
          userName: "doesn't exist and will never exist as its really long",
        },
      });
      assert.equal(res.data.userNameTaken, false);
    });
  });
});
describe('geniusSearchResults', () => {
  const { query } = createTestClient(server);
  const geniusSearchResults = `
      query geniussearchresults($query: String){
        geniusSearchResults(query: $query){
          id 
          imgUrl
          text
          forwardingUrl
        }
    }`;
  it('should be an array of non zero length, and the id, imgUrl, and text should be defined', async () => {
    const res = await query({
      query: geniusSearchResults,
      variables: { query: 'tesseract' },
    });
    console.log(res.data.geniusSearchResults)
    assert.notEqual(res.data.geniusSearchResults.length, 0);
    res.data.geniusSearchResults.map((result) => {
      assert.notEqual(result.id, undefined);
      assert.notEqual(result.imgUrl, undefined);
      assert.notEqual(result.text, undefined);
      assert.notEqual(result.forwardingUrl, undefined);
    });
  });
}).timeout(100000);
describe('youtubeSearchResults', () => {
  const { query } = createTestClient(server);
  const youtubeSearchResults = `
      query youtubesearchresults($query: String){
        youtubeSearchResults(query: $query){
          id 
          imgUrl
          text
        }
    }`;
  it('should be an array of non zero length, and the id, imgUrl, and text should be defined', async () => {
    const res = await query({
      query: youtubeSearchResults,
      variables: { query: 'tesseract' },
    });
    assert.notEqual(res.data.youtubeSearchResults.length, 0);
    res.data.youtubeSearchResults.map((result) => {
      assert.notEqual(result.id, undefined);
      assert.notEqual(result.imgUrl, undefined);
      assert.notEqual(result.text, undefined);
    });
  });
}).timeout(100000);

describe('youtubeVideoData', () => {
  const { query } = createTestClient(server);
  it('should return all possible variables of the correct youtube video for a valid link', async () => {
    const youtubeVideoData = `
        query youtubevideodata ($url: String){
          youtubeVideoData(url: $url){
            text
            id 
            imgUrl
          }
      }`;

    const res = await query({
      query: youtubeVideoData,
      variables: { url: 'https://www.youtube.com/watch?v=jO_Cp-Qlg5E' },
    });
    assert.equal(
      JSON.stringify(res.data),
      JSON.stringify({
        youtubeVideoData: {
          text: 'TesseracT - Survival (from Polaris)',
          id: 'jO_Cp-Qlg5E',
          imgUrl: 'https://i.ytimg.com/vi/jO_Cp-Qlg5E/hqdefault.jpg',
        },
      })
    );
  });
}).timeout(100000);
describe('geniusSongData', () => {
  const { query } = createTestClient(server);
  it('should return all possible variables of the genius id', async () => {
    const geniusSongData = `
        query geniussongdata ($id: String){
          geniusSongData(id: $id){
            text
            id 
            imgUrl
            forwardingUrl
          }
      }`;

    const res = await query({
      query: geniusSongData,
      variables: { id: '2312706' },
    });
    assert.equal(
      JSON.stringify(res.data),
      JSON.stringify({
        geniusSongData: {
          text: 'TesseracT - Survival',
          id: '2312706',
          imgUrl:
            'https://images.rapgenius.com/433342e91270bceaa60762480ca6eda3.1000x1000x1.jpg',
          forwardingUrl: `/genius/2312706`,
        },
      })
    );
  });
}).timeout(100000);
describe('displayLyrics', () => {
  const { query } = createTestClient(server);
  it('properly parse the lyrics', async () => {
    const displayLyrics = `
      query {
        displayLyrics(id: "2312706")
      }`;
    const res = await query({
      query: displayLyrics,
      variables: { id: '2312706' },
    });
    assert.equal(
      JSON.stringify(res.data),
      JSON.stringify({
        displayLyrics: [
          'Will I disappear with a vision of tomorrow?',
          'Will I disappear?',
          'Will I disappear with a vision of tomorrow?',
          "Will I disappear until I can't feel the light?",
          'Will I disappear with the memory of the sorrow?',
          "Will I disappear until I can't feel the light?",
          '',
          'Ten years of hope have passed, you felt alone',
          'And pictured life a little differently',
          'And people say that life has just begun',
          '',
          'You wait impatiently, a lotus in the sun',
          'You radiate for me, a luminescent light',
          'And people say that life has just begun',
          "When you're not a part of me I feel dead inside",
          '',
          'Disturbed',
          'Will I disappear with a vision of tomorrow',
          "Until I can't feel the light",
          'Disturbed',
          "And I get the feeling I've been here before",
          "I'm the abandoner",
          '',
          'Ten years of sorrow pass and no pleasure in the sun',
          "You couldn't cope in all honesty",
          'The secrets of the past will come undone',
          'Seasons of change elapse',
          'Honor no mistrust',
          'Faithfully until the day you die',
          "And people say the journey's just begun",
          "When you're not a part of me, I feel dead inside",
          '',
          'Disturbed, will I disappear with a vision of tomorrow',
          'Or will I fall?',
          "Disturbed, when I get the feeling I've been here before",
          'Disturbed, will I disappear with a vision of tomorrow',
          'Or will I fall?',
          "Disturbed, when I get the feeling I've been here before",
          "I'm the abandoner",
        ],
      })
    );
  }).timeout(100000);
});
describe('processedLyrics', () => {
  const { query } = createTestClient(server);
  it('properly processes the parsed lyrics', async () => {
    const processedLyrics = `
      query {
        processedLyrics(id: "2312706"){
          id
          text
        }
      }`;
    const res = await query({
      query: processedLyrics,
      variables: { id: '2312706' },
    });
    assert.equal(
      JSON.stringify(res.data),
      JSON.stringify({
        processedLyrics: [
          [
            { id: 0, text: 'Will' },
            { id: 1, text: 'I' },
            { id: 2, text: 'disappear' },
            { id: 3, text: 'with' },
            { id: 4, text: 'a' },
            { id: 5, text: 'vision' },
            { id: 6, text: 'of' },
            { id: 7, text: 'tomorrow' },
          ],
          [
            { id: 8, text: 'Will' },
            { id: 9, text: 'I' },
            { id: 10, text: 'disappear' },
          ],
          [
            { id: 11, text: 'Will' },
            { id: 12, text: 'I' },
            { id: 13, text: 'disappear' },
            { id: 14, text: 'with' },
            { id: 15, text: 'a' },
            { id: 16, text: 'vision' },
            { id: 17, text: 'of' },
            { id: 18, text: 'tomorrow' },
          ],
          [
            { id: 19, text: 'Will' },
            { id: 20, text: 'I' },
            { id: 21, text: 'disappear' },
            { id: 22, text: 'until' },
            { id: 23, text: 'I' },
            { id: 24, text: "can't" },
            { id: 25, text: 'feel' },
            { id: 26, text: 'the' },
            { id: 27, text: 'light' },
          ],
          [
            { id: 28, text: 'Will' },
            { id: 29, text: 'I' },
            { id: 30, text: 'disappear' },
            { id: 31, text: 'with' },
            { id: 32, text: 'the' },
            { id: 33, text: 'memory' },
            { id: 34, text: 'of' },
            { id: 35, text: 'the' },
            { id: 36, text: 'sorrow' },
          ],
          [
            { id: 37, text: 'Will' },
            { id: 38, text: 'I' },
            { id: 39, text: 'disappear' },
            { id: 40, text: 'until' },
            { id: 41, text: 'I' },
            { id: 42, text: "can't" },
            { id: 43, text: 'feel' },
            { id: 44, text: 'the' },
            { id: 45, text: 'light' },
          ],
          [
            { id: 46, text: 'Ten' },
            { id: 47, text: 'years' },
            { id: 48, text: 'of' },
            { id: 49, text: 'hope' },
            { id: 50, text: 'have' },
            { id: 51, text: 'passed' },
            { id: 52, text: 'you' },
            { id: 53, text: 'felt' },
            { id: 54, text: 'alone' },
          ],
          [
            { id: 55, text: 'And' },
            { id: 56, text: 'pictured' },
            { id: 57, text: 'life' },
            { id: 58, text: 'a' },
            { id: 59, text: 'little' },
            { id: 60, text: 'differently' },
          ],
          [
            { id: 61, text: 'And' },
            { id: 62, text: 'people' },
            { id: 63, text: 'say' },
            { id: 64, text: 'that' },
            { id: 65, text: 'life' },
            { id: 66, text: 'has' },
            { id: 67, text: 'just' },
            { id: 68, text: 'begun' },
          ],
          [
            { id: 69, text: 'You' },
            { id: 70, text: 'wait' },
            { id: 71, text: 'impatiently' },
            { id: 72, text: 'a' },
            { id: 73, text: 'lotus' },
            { id: 74, text: 'in' },
            { id: 75, text: 'the' },
            { id: 76, text: 'sun' },
          ],
          [
            { id: 77, text: 'You' },
            { id: 78, text: 'radiate' },
            { id: 79, text: 'for' },
            { id: 80, text: 'me' },
            { id: 81, text: 'a' },
            { id: 82, text: 'luminescent' },
            { id: 83, text: 'light' },
          ],
          [
            { id: 84, text: 'And' },
            { id: 85, text: 'people' },
            { id: 86, text: 'say' },
            { id: 87, text: 'that' },
            { id: 88, text: 'life' },
            { id: 89, text: 'has' },
            { id: 90, text: 'just' },
            { id: 91, text: 'begun' },
          ],
          [
            { id: 92, text: 'When' },
            { id: 93, text: "you're" },
            { id: 94, text: 'not' },
            { id: 95, text: 'a' },
            { id: 96, text: 'part' },
            { id: 97, text: 'of' },
            { id: 98, text: 'me' },
            { id: 99, text: 'I' },
            { id: 100, text: 'feel' },
            { id: 101, text: 'dead' },
            { id: 102, text: 'inside' },
          ],
          [{ id: 103, text: 'Disturbed' }],
          [
            { id: 104, text: 'Will' },
            { id: 105, text: 'I' },
            { id: 106, text: 'disappear' },
            { id: 107, text: 'with' },
            { id: 108, text: 'a' },
            { id: 109, text: 'vision' },
            { id: 110, text: 'of' },
            { id: 111, text: 'tomorrow' },
          ],
          [
            { id: 112, text: 'Until' },
            { id: 113, text: 'I' },
            { id: 114, text: "can't" },
            { id: 115, text: 'feel' },
            { id: 116, text: 'the' },
            { id: 117, text: 'light' },
          ],
          [{ id: 118, text: 'Disturbed' }],
          [
            { id: 119, text: 'And' },
            { id: 120, text: 'I' },
            { id: 121, text: 'get' },
            { id: 122, text: 'the' },
            { id: 123, text: 'feeling' },
            { id: 124, text: "I've" },
            { id: 125, text: 'been' },
            { id: 126, text: 'here' },
            { id: 127, text: 'before' },
          ],
          [
            { id: 128, text: "I'm" },
            { id: 129, text: 'the' },
            { id: 130, text: 'abandoner' },
          ],
          [
            { id: 131, text: 'Ten' },
            { id: 132, text: 'years' },
            { id: 133, text: 'of' },
            { id: 134, text: 'sorrow' },
            { id: 135, text: 'pass' },
            { id: 136, text: 'and' },
            { id: 137, text: 'no' },
            { id: 138, text: 'pleasure' },
            { id: 139, text: 'in' },
            { id: 140, text: 'the' },
            { id: 141, text: 'sun' },
          ],
          [
            { id: 142, text: 'You' },
            { id: 143, text: "couldn't" },
            { id: 144, text: 'cope' },
            { id: 145, text: 'in' },
            { id: 146, text: 'all' },
            { id: 147, text: 'honesty' },
          ],
          [
            { id: 148, text: 'The' },
            { id: 149, text: 'secrets' },
            { id: 150, text: 'of' },
            { id: 151, text: 'the' },
            { id: 152, text: 'past' },
            { id: 153, text: 'will' },
            { id: 154, text: 'come' },
            { id: 155, text: 'undone' },
          ],
          [
            { id: 156, text: 'Seasons' },
            { id: 157, text: 'of' },
            { id: 158, text: 'change' },
            { id: 159, text: 'elapse' },
          ],
          [
            { id: 160, text: 'Honor' },
            { id: 161, text: 'no' },
            { id: 162, text: 'mistrust' },
          ],
          [
            { id: 163, text: 'Faithfully' },
            { id: 164, text: 'until' },
            { id: 165, text: 'the' },
            { id: 166, text: 'day' },
            { id: 167, text: 'you' },
            { id: 168, text: 'die' },
          ],
          [
            { id: 169, text: 'And' },
            { id: 170, text: 'people' },
            { id: 171, text: 'say' },
            { id: 172, text: 'the' },
            { id: 173, text: "journey's" },
            { id: 174, text: 'just' },
            { id: 175, text: 'begun' },
          ],
          [
            { id: 176, text: 'When' },
            { id: 177, text: "you're" },
            { id: 178, text: 'not' },
            { id: 179, text: 'a' },
            { id: 180, text: 'part' },
            { id: 181, text: 'of' },
            { id: 182, text: 'me' },
            { id: 183, text: 'I' },
            { id: 184, text: 'feel' },
            { id: 185, text: 'dead' },
            { id: 186, text: 'inside' },
          ],
          [
            { id: 187, text: 'Disturbed' },
            { id: 188, text: 'will' },
            { id: 189, text: 'I' },
            { id: 190, text: 'disappear' },
            { id: 191, text: 'with' },
            { id: 192, text: 'a' },
            { id: 193, text: 'vision' },
            { id: 194, text: 'of' },
            { id: 195, text: 'tomorrow' },
          ],
          [
            { id: 196, text: 'Or' },
            { id: 197, text: 'will' },
            { id: 198, text: 'I' },
            { id: 199, text: 'fall' },
          ],
          [
            { id: 200, text: 'Disturbed' },
            { id: 201, text: 'when' },
            { id: 202, text: 'I' },
            { id: 203, text: 'get' },
            { id: 204, text: 'the' },
            { id: 205, text: 'feeling' },
            { id: 206, text: "I've" },
            { id: 207, text: 'been' },
            { id: 208, text: 'here' },
            { id: 209, text: 'before' },
          ],
          [
            { id: 210, text: 'Disturbed' },
            { id: 211, text: 'will' },
            { id: 212, text: 'I' },
            { id: 213, text: 'disappear' },
            { id: 214, text: 'with' },
            { id: 215, text: 'a' },
            { id: 216, text: 'vision' },
            { id: 217, text: 'of' },
            { id: 218, text: 'tomorrow' },
          ],
          [
            { id: 219, text: 'Or' },
            { id: 220, text: 'will' },
            { id: 221, text: 'I' },
            { id: 222, text: 'fall' },
          ],
          [
            { id: 223, text: 'Disturbed' },
            { id: 224, text: 'when' },
            { id: 225, text: 'I' },
            { id: 226, text: 'get' },
            { id: 227, text: 'the' },
            { id: 228, text: 'feeling' },
            { id: 229, text: "I've" },
            { id: 230, text: 'been' },
            { id: 231, text: 'here' },
            { id: 232, text: 'before' },
          ],
          [
            { id: 233, text: "I'm" },
            { id: 234, text: 'the' },
            { id: 235, text: 'abandoner' },
          ],
        ],
      })
    );
  }).timeout(100000);
});
describe('Sequelize sync testing', () => {
  before(async () => {
    const { mutate } = createTestClient(server);
    const POST_SYNCED_LYRICS = `
      mutation postsyncedlyrics($syncedLyrics: [[InputSyncedLyric]], $synchronizationData: InputSynchronizationData){
          postSyncedLyrics(syncedLyrics: $syncedLyrics, synchronizationData: $synchronizationData)
      }
      `;

    const testUser = await User.findOne({
      googleID: '105395086988085655499',
      userName: 'Orek',
    });
    if (!testUser) {
      return User.create({
        googleID: '105395086988085655499',
        userName: 'Orek',
      });
    }
    return mutate({
      mutation: POST_SYNCED_LYRICS,
      variables: {
        synchronizationData: {
          startTime: 50,
          endTime: 272,
          youtubeID: 'uuNNSBfO3G8',
          geniusID: '5367420',
        },
        syncedLyrics: sampleSync.map((word) => {
          delete word.__typename;
          return word;
        }),
      },
    });
  });
  it('fetches youtubeID for respective geniusID correctly', async () => {
    const { query } = createTestClient(server);
    const SYNCHRONIZATION_DATA = `
        query synchronizationdata($geniusID: String) 
        {
          synchronizationData(geniusID: $geniusID) {
            youtubeID
          }
        }
      `;
    const syncRes = await query({
      query: SYNCHRONIZATION_DATA,
      variables: {
        geniusID: '5367420',
      },
    });
    //check that many to many works
    const youtubeIDs = syncRes.data.synchronizationData.map((result) => {
      return result.youtubeID;
    });
    assert.equal(youtubeIDs.includes('uuNNSBfO3G8'), true);
  });
  it('finds synchronizationData for a specific sync correctly', async () => {
    const { query } = createTestClient(server);
    const SYNCHRONIZATION_DATA = `
        query synchronizationdata($geniusID: String) 
        {
          synchronizationData(geniusID: $geniusID) {
            startTime
            endTime
            youtubeID
            geniusID
          }
        }
      `;
    const res = await query({
      query: SYNCHRONIZATION_DATA,
      variables: {
        youtubeID: 'uuNNSBfO3G8',
        geniusID: '5367420',
      },
    });

    //check that many to many works
    assert.equal(
      JSON.stringify(res.data),
      JSON.stringify({
        synchronizationData: [
          {
            startTime: 50,
            endTime: 272,
            youtubeID: 'uuNNSBfO3G8',
            geniusID: '5367420',
          },
        ],
      })
    );
  });

  it('returns syncedLyrics properly and divides the lyrics in to rows by time', async () => {
    const { query } = createTestClient(server);
    const SYNCED_LYRIC_QUERY = `
      query syncedlyrics($youtubeID: String, $geniusID: String){
        syncedLyrics(youtubeID: $youtubeID, geniusID: $geniusID){
          text
          time
          id
          horizontalOffsetPercentage
        }
    }`;
    const res = await query({
      query: SYNCED_LYRIC_QUERY,
      variables: {
        youtubeID: 'uuNNSBfO3G8',
        geniusID: '5367420',
      },
    });

    //find the left bound of the first time block
    const startTime =
      res.data.syncedLyrics[0][0].time - (res.data.syncedLyrics[0][0].time % 3);
    res.data.syncedLyrics.forEach((bucket, bucketIndex) => {
      //check that each value belongs in correct bucket
      const inCorrectBuckets = bucket.every((syncedLyric) => {
        const toReturn =
          Math.floor((syncedLyric.time - startTime) / 3) === bucketIndex;
        if (!toReturn) {
          debugger;
        }
        return toReturn;
      });
      assert.equal(inCorrectBuckets, true);
    });

    //check all lyrics are placed inside buckets
    const matchingLyrics = await SyncedLyric.findAll({
      where: {
        youtubeID: 'uuNNSBfO3G8',
        geniusID: '5367420',
      },
      order: ['time'],
    });

    matchingLyrics.forEach((syncedLyric) => {
      var inBuckets = false;
      res.data.syncedLyrics.forEach((bucket) => {
        bucket.forEach((resLyric) => {
          if (
            syncedLyric.id === resLyric.id &&
            syncedLyric.text === resLyric.text
          ) {
            inBuckets = true;
          }
        });
      });
      if (!inBuckets) {
        console.log(syncedLyric);
      }
      assert.equal(inBuckets, true);
    });
  });
});
