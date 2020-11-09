const mongoose = require('mongoose');

const UserSchema = require('./user.schema');
const UserModel = mongoose.model('User', UserSchema);

const UploadSchema = require('./upload.schema');
const UploadModel = mongoose.model('Upload', UploadSchema);

const AreaSchema = require('./area.schema');
const AreaModel = mongoose.model('Area', AreaSchema);

const ExpedienteSchema = require('./expediente.schema');
const ExpedienteModel = mongoose.model('Expediente', ExpedienteSchema);

const Database = {
  connection: undefined,

  user: UserModel,

  upload: UploadModel,

  area: AreaModel,

  expte: ExpedienteModel,

  async connect() {
    let _conn;
    return new Promise(async (resolve, reject) => {
      try {
        _conn = await mongoose.connect(process.env.MONGO, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      } catch (error) {
        reject(error);
      }

      if (_conn) {
        resolve(_conn);
      } else {
        reject('erororcirto');
      }
    });
  },
};

module.exports = Database;
