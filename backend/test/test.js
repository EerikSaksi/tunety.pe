var assert = require('assert');
const { createTestClient } = require('apollo-server-testing');
const server = require('../index')

describe('Resolvers', () => {
  //kinda janky, but wait for server to be ready 
  before(function (done) {
    this.timeout(20000)
    setTimeout(done, 3000)
  },)
  describe('geniusSearchResults', () => {
    const {query} = createTestClient(server);
    const geniusSearchResults = `
      query geniussearchresults($query: String){
        geniusSearchResults(query: $query){
          id 
          imgUrl
          text
          isYoutube
        }
    }`
    it('should be an array of non zero length, and the id, imgUrl, and text should be defined', async function() {
      const res = await query({query: geniusSearchResults, variables: {query: 'tesseract'}})
      assert.notEqual(res.data.geniusSearchResults.length, 0)
      res.data.geniusSearchResults.map((result) => {
        assert.notEqual(result.id, undefined)
        assert.notEqual(result.imgUrl, undefined)
        assert.notEqual(result.text, undefined)
        assert.notEqual(result.isYoutube, undefined)
      })
    });
  })

  describe('youtubeSearchResults', () => {
    const {query} = createTestClient(server);
    const youtubeSearchResults = `
      query youtubesearchresults($query: String){
        youtubeSearchResults(query: $query){
          id 
          imgUrl
          text
          isYoutube
        }
    }`
    it('should be an array of non zero length, and the id, imgUrl, and text should be defined', async function() {
      const res = await query({query: youtubeSearchResults, variables: {query: 'tesseract'}})
      assert.notEqual(res.data.youtubeSearchResults.length, 0)
      res.data.youtubeSearchResults.map((result) => {
        assert.notEqual(result.id, undefined)
        assert.notEqual(result.imgUrl, undefined)
        assert.notEqual(result.text, undefined)
        assert.notEqual(result.isYoutube, undefined)
      })
    });
  })

  describe('youtubeVideoData', function(){
    const {query} = createTestClient(server);
    it('should return all possible variables of the correct youtube video for a valid link', async () => {
      const youtubeVideoData = `
        query youtubevideodata ($url: String){
          youtubeVideoData(url: $url){
            text
            id 
            imgUrl
            isYoutube
          }
      }`
       
      const res = await query({query: youtubeVideoData, variables: {url: 'https://www.youtube.com/watch?v=jO_Cp-Qlg5E'}})
      assert.equal(JSON.stringify(res.data), 
          JSON.stringify({
            "youtubeVideoData":
            {
              "text": "TesseracT - Survival (from Polaris)",
              "id": "jO_Cp-Qlg5E",
              "imgUrl": "https://i.ytimg.com/vi/jO_Cp-Qlg5E/hqdefault.jpg",
              "isYoutube": true
            }
          })
      )
    });
  })
  describe('geniusSongData', function(){
    const {query} = createTestClient(server);
    it('should return all possible variables of the genius id', async () => {
      const geniusSongData = `
        query geniussongdata ($id: String){
          geniusSongData(id: $id){
            text
            id 
            imgUrl
            isYoutube
          }
      }`
       
      const res = await query({query: geniusSongData, variables: {id: '2312706'}})
      assert.equal(JSON.stringify(res.data), 
        JSON.stringify(
          {
            "geniusSongData": {
              "text": "TesseracT - Survival",
              "id": "2312706",
              "imgUrl": "https://images.rapgenius.com/433342e91270bceaa60762480ca6eda3.1000x1000x1.jpg",
              "isYoutube": false
            }
          })
      )
    });
  })

})

