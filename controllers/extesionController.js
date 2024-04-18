const Extesion = require("../models/extesionModel");
const handlerFactory = require("../utils/handlerFactory");
exports.getextesion = handlerFactory.getOne(Extesion);
exports.createextesion = handlerFactory.createOne(Extesion);
exports.updateextesion = handlerFactory.updateOne(Extesion);
exports.deleteextesion = handlerFactory.deleteOne(Extesion);
exports.getAllextesion = handlerFactory.getAll(Extesion);

