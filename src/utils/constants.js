
const jobs = {

  resetPassword: 'resetPassword',
};

const FILE_SIZE_LIMIT = 2097152;
const MAX_CSV_FILE_SIZE = 5242880;

const requestStatus = {
  pending: 'pending',
  cancelled: 'cancelled',
  completed: 'completed',
  accepted: 'accepted',
  expired: 'expired',
};

module.exports = {
  jobs,
  FILE_SIZE_LIMIT,
  MAX_CSV_FILE_SIZE,
  requestStatus,
};
