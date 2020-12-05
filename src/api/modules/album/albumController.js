
const service = require('../../../services/albumService');
const Response = require('../../../utils/response');
const Logger = require('../../../loaders/logger');

class Album {

  static async create(req, res) {
    try {
      const data = await service.create(req)
      Response.success(res, 'success', data)

    } catch (error) {
      Logger.info("error", 'error while creating album')
      Response.fail(res, error)

    }
  }

  static async musiciansListForAlbum(req, res) {
    console.log("huh")
    try {
      const data = await service.musiciansListForAlbum(req)
      Response.success(res, 'success', data)

    } catch (error) {
      Logger.info("error", 'error while creating album')
      Response.fail(res, error)

    }

  }
  static async lowePriceAlbums(req, res) {
    console.log("huh")
    try {
      const data = await service.lowePriceAlbums(req)
      Response.success(res, 'success', data)

    } catch (error) {
      Logger.info("error", 'error while creating album')
      Response.fail(res, error)

    }

  }

  static async allAlbums(req, res) {
    console.log("huh")
    try {
      const data = await service.allAlbums(req)
      Response.success(res, 'success', data)

    } catch (error) {
      Logger.info("error", 'error while creating album')
      Response.fail(res, error)

    }

  }

  static async musiciansList(req, res) {
    console.log("huh")
    try {
      const data = await service.musiciansList(req)
      Response.success(res, 'success', data)

    } catch (error) {
      Logger.info("error", 'error while creating album')
      Response.fail(res, error)

    }

  }




}

module.exports = Album