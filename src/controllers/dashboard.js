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
        .then(result =>
            res.status(StatusCodes.OK)
                .send(result))
        .catch(error =>
            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                .send(console.log(error.message)))
}

const remove = (req, res) => {
    const { id } = req.params;
    DashboardModel.deleteOne({ _id: id })
        .then(result => {
            chartsResult = ChartModel.deleteMany({ dashboardId: id }).then()
                .catch(error =>
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                        .send(error.message))
            res.status(
                result.n === 1 ?
                    (result.deletedCount === 1 ?
                        StatusCodes.OK
                        : StatusCodes.INTERNAL_SERVER_ERROR)
                    : StatusCodes.NOT_FOUND)
                .send(result.n === 1 ?
                    (result.deletedCount === 1 ? 'Dashboard deleted!' : '')
                    : 'Dashboard not found!')
        })
        .catch(error =>
            res.status(StatusCodes.NOT_FOUND)
                .send(error.message))
}

const createChart = async (req, res) => {
    const chart = req.body;
    const dashboard = await DashboardModel.findById(chart.dashboardId)
    if (dashboard) {
        await ChartModel.create(chart)
            .then(result => addChartToDashboard(result.dashboardId, result._id, res))
            .catch(error =>
                res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                    .send(error.message))
    } else {
        res.status(StatusCodes.NOT_FOUND)
            .send('Dashboard not found')
    }
}

const addChartToDashboard = (dashboardId, chartId, res) => {
    DashboardModel.updateOne(
        { _id: dashboardId },
        { $push: { charts: chartId } },
        { runValidators: true }
    )
        .then(() =>
            res.status(StatusCodes.OK)
                .send('Chart added to Dashboard!'))
        .catch(error => res
            .status(StatusCodes.BAD_REQUEST)
            .send(error.message))
}

module.exports = {
    create, getAll, remove, createChart,
}

