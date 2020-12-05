const si = require('systeminformation');

const getMemoryInfo = async (req, res, next) => {
  try {
    const data = await si.mem();
    const load = await si.currentLoad();

    const { total, free, used } = data;
    const {
      avgload,
      currentload,
      currentload_user,
      currentload_system,
      currentload_nice,
      currentload_idle,
      currentload_irq,
    } = load;

    const response = {
      total: `${Math.round(total / (1024 * 1024))} MB`,
      free: `${Math.round(free / (1024 * 1024))} MB`,
      used: `${Math.round(used / (1024 * 1024))} MB`,
      avgload,
      currentload: `${Math.round(currentload)} %`,
      currentload_user: `${Math.round(currentload_user)} %`,
      currentload_system: `${Math.round(currentload_system)} %`,
      currentload_nice: `${Math.round(currentload_nice)} %`,
      currentload_idle: `${Math.round(currentload_idle)} %`,
      currentload_irq: `${Math.round(currentload_irq)} %`,
    };
    return res.status(200).send({ status: true, statusCode: 200, message: 'Success', data: response });
  } catch (error) {
    return res.status(500).send({ status: false, statusCode: 500, message: error.message });
  }
};

module.exports = getMemoryInfo;
