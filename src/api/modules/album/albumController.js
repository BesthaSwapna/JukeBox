
const service = require('../../../services/albumService');
const Response = require('../../../utils/response');
const Logger = require('../../../loaders/logger');

class Album {

  // 1 API create/update  album 
  static async create(req, res) {
    try {
      const data = await service.create(req)
      Response.success(res, 'success', data)

    } catch (error) {
      Logger.info("error", 'error while creating album')
      Response.fail(res, error)

    }
  }
  //5 API
  static async musiciansListForAlbum(req, res) {
    try {
      const data = await service.musiciansListForAlbum(req)
      Response.success(res, 'success', data)

    } catch (error) {
      Logger.info("error", 'error while creating album')
      Response.fail(res, error)

    }

  }

  // 3API
  static async lowePriceAlbums(req, res) {
    try {
      const data = await service.lowePriceAlbums(req)
      Response.success(res, 'success', data)

    } catch (error) {
      Logger.info("error", 'error while creating album')
      Response.fail(res, error)

    }

  }
  //2 API
  static async allAlbums(req, res) {
    try {
      const data = await service.allAlbums(req)
      Response.success(res, 'success', data)

    } catch (error) {
      Logger.info("error", 'error while creating album')
      Response.fail(res, error)

    }

  }

}

module.exports = Album