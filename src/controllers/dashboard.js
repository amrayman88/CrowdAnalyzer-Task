const { DashboardModel } = require('../models')
const { ChartModel } = require('../models')
const { StatusCodes } = require('http-status-codes');

const create = (req, res) => {
    DashboardModel.create(req.body)
        .then(result => res.status(StatusCodes.CREATED).send(result))
        .catch(error => res.status(StatusCodes.BAD_REQUEST).send(error.message))
}

const getAll = (req, res) => {
    DashboardModel.find()
        .populate('charts')
        .then(result => res
            .status(StatusCodes.OK)
            .send(result))
        .catch(error => res.
            status(StatusCodes.NOT_FOUND)
            .send(console.log(error)))
}

const remove = (req, res) => {
    const { body } = req;
    DashboardModel.deleteOne(body)
        .then(() => res
            .status(StatusCodes.OK)
            .send('Dashboard deleted!'))
        .catch(error => res
            .status(StatusCodes.NOT_FOUND)
            .send('Dashboard not found'))
}

const createChart = async (req, res) => {
    const { dashboardId, chart } = req.body;
    console.log(dashboardId)
    console.log(chart)
    const dashboard = await DashboardModel.findById(dashboardId)
    if (dashboard) {
        await ChartModel.create(chart)
            .then(result => addChartToDashboard(dashboardId, result._id, res))
            .catch(error => res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send(error.message))
    } else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send('Dashboard not found')
    }
}

const addChartToDashboard = (dashboardId, chartId, res) => {
    DashboardModel.updateOne(
        { _id: dashboardId },
        { $push: { charts: chartId } })
        .then(() => res
            .status(StatusCodes.OK)
            .send('Chart added to Dashboard!'))
        .catch(error => res
            .status(StatusCodes.BAD_REQUEST)
            .sned(error.message))
}

module.exports = {
    create, getAll, remove, createChart,
}

