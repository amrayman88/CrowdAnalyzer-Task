const config = require('../../config')

function chartsSizeValidator(charts) {
    return charts.length <= config.dahsboardChartsMaxLength
}

module.exports = [chartsSizeValidator, `Max of ${config.dahsboardChartsMaxLength} Charts reached!`]
