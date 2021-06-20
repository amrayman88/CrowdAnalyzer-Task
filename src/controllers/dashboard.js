const DashboardModel = require('../models/dashboard')
const { StatusCodes } = require('http-status-codes');

const create = async (req, res, next) => {
    console.log("here")
    console.log(req.body)
    DashboardModel.create(req.body)
    .then(result => res.status(StatusCodes.CREATED).send(result))
    .catch(error => res.status(StatusCodes.BAD_REQUEST).send())
}

const getAll = async (req, res, next) => {
    DashboardModel.find()
    .then(result => res
        .status(StatusCodes.OK)
        .send(result))
    .catch(error => res.
        status(StatusCodes.NOT_FOUND)
        .send())
}

const remove = async (req, res, next) => {
    const {body} = req;
    DashboardModel.remove(body)
    .then(result => res
        .status(StatusCodes.OK)
        .send('Dashboard deleted.'))
    .catch(error => res.
        status(StatusCodes.NOT_FOUND)
        .send())
}

module.exports = {
    create, getAll, remove,
}

