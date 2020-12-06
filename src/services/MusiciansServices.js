const { models } = require('../loaders/sequelize')
const Logger = require('../loaders/logger');
const { Response, ResponseMessage } = require('../utils');


// const uuid = require('uuid-random');
const { assignWith, includes } = require('lodash');

class Musicians {
  // 4 API
  //API to create/update musician records
  static async create(data) {
    try {
      let MusiciansData = data.body
      MusiciansData.created_at = new Date()
      let condition = {
        where: { musician_id: MusiciansData.musician_id }
      }
      const ExistingMusician = await models.musicians.findOne(condition)
      if (ExistingMusician) {
        let UpdateDate = MusiciansData
        delete UpdateDate.musician_id
        const UpdatedMsician = await models.musicians.update(MusiciansData, condition)
        return "Successfully Upated"
      }
      const MusiciansRecord = await models.musicians.create(MusiciansData)
      return MusiciansRecord
    } catch (error) {
      Logger.log('error', 'error in Create musician', error);
      throw Response.createError(ResponseMessage.tryAgain, error);
    }
  }

}

module.exports = Musicians


