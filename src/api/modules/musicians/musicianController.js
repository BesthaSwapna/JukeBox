
const service = require('../../../services/MusiciansServices');
const Response = require('../../../utils/response');
const Logger = require('../../../loaders/logger');

class Album {

  static async create(req, res) {
    console.log("heer")
    try {
      const data = await service.create(req)
      Response.success(res, 'success', data)

    } catch (error) {
      Logger.info("error", 'error while creating album')
      Response.fail(res, error)

    }
  }

}

module.exports = Album