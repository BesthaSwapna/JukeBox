const { Op } = require('sequelize')
const { models } = require('../loaders/sequelize')
const Logger = require('../loaders/logger');
const { Response, ResponseMessage } = require('../utils');


// const uuid = require('uuid-random');
const { modules } = require('../config');

class AlbumService {

  // 1 API
  // Create/Update Music Album
  static async create(data) {
    try {
      let albumData = data.body
      const musicianIds = albumData.musicians_ids
      delete albumData.musicians_ids
      albumData.created_at = new Date()
      let condition = {
        where: { album_id: albumData.album_id },
        include: models.musicians
      }
      //check for the album if exist  update the record or add musician to  respective album 
      const existingAlbum = await models.albums.findOne(condition)
      if (existingAlbum) {
        let uppdateData = albumData;
        delete uppdateData.album_id;
        const musicians = await models.musicians.findAll({ where: { musician_id: { [Op.in]: musicianIds } } })
        await existingAlbum.addMusicians(musicians);
        const UpdatedMsician = await models.albums.update(albumData, condition)
        return "Successfully Upated"
      }
      //else create album and  add to adlbum_musicia  relational table 
      const albumRecord = await models.albums.create(albumData);
      await this.addMusicians(albumRecord, musicianIds)
      return albumRecord;
    } catch (error) {
      Logger.log('error', 'error in create musician', error);
      throw Response.createError(ResponseMessage.tryAgain, error);
    }
  }

  // function for chceking if the the given musicianIds exist and then add them into album_musicians table
  static async addMusicians(albumRecord, musicianIds) {
    const musicians = await models.musicians.findAll({ where: { musician_id: { [Op.in]: musicianIds } } })
    await albumRecord.addMusicians(musicians);
  }



  // 5 API
  // list of musicians for a music album sorted by musician's Name
  static async musiciansListForAlbum(req) {
    try {
      const AlbumRecords = await models.albums.findOne({
        where: { album_id: req.params.album_id },
        include: models.musicians,
        // Add order conditions here....
        order: [
          [models.musicians, 'musician_name', 'asc']
        ],
        attributes: ['name', 'release_date', 'genre', 'price', 'album_id']
      });
      return AlbumRecords

    } catch (error) {
      Logger.log('error', 'error in get musiciansListForAlbum', error);
      throw Response.createError(ResponseMessage.tryAgain, error);
    }
  }


  // 3 API
  //  list of Music albums for a musician sorted by Price in ascending order

  static async lowePriceAlbums(req) {
    try {
      const AlbumRecords = await models.albums.findAll({
        where: {},
        include: models.musicians,
        // Add order conditions here....
        order: [
          ['price', 'ASC']

        ],
        attributes: ['name', 'release_date', 'genre', 'price', 'album_id', 'created_at']
      });
      return AlbumRecords

    } catch (error) {
      Logger.log('error', 'error in Get lowePriceAlbums', error);
      throw Response.createError(ResponseMessage.tryAgain, error);
    }
  }



  // 2 API list of Music albums sorted by Date of release in ascending order 
  static async allAlbums() {
    try {
      const items = await models.albums.findAll({
        where: {},
        attributes: ['name', 'release_date', 'genre', 'price', 'album_id', 'created_at']
      });
      return quickSort(items, 0, items.length - 1);
    } catch (error) {
      Logger.log('error', 'error in get allAlbums  ', error);
      throw Response.createError(ResponseMessage.tryAgain, error);

    }
  }
}


function swap(items, leftIndex, rightIndex) {
  var temp = items[leftIndex].release_date;
  items[leftIndex].release_date = items[rightIndex].release_date;
  items[rightIndex].release_date = temp;
}
function partition(items, left, right) {
  var pivot = items[Math.floor((right + left) / 2)].release_date, //middle element
    i = left, //left pointer
    j = right; //right pointer
  while (i <= j) {
    while (items[i].release_date < pivot) {
      i++;
    }
    while (items[j].release_date > pivot) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j); //sawpping two elements
      i++;
      j--;
    }
  }
  return i;
}

function quickSort(items, left, right) {
  console.log("iun sore")
  var index;
  if (items.length > 1) {
    index = partition(items, left, right); //index returned from partition
    if (left < index - 1) { //more elements on the left side of the pivot
      quickSort(items, left, index - 1);
    }
    if (index < right) { //more elements on the right side of the pivot
      quickSort(items, index, right);
    }
  }
  return items;
}


module.exports = AlbumService
