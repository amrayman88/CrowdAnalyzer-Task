module.exports = {
    PORT: process.env.PORT || 3000,
    db: process.env.MONGO_DB_URL || 'mongodb+srv://admin:admin@cluster0.otahu.mongodb.net/test?retryWrites=true&w=majority',
    chartHourConstraint: 7,
    chartHourConstraintMs: this.chartHourConstraint * 24 * 60 * 60 * 1000,
    dahsboardTitleMaxLength: 50,
    dahsboardDiscriptionMaxLength: 200,
    dahsboardChartsMaxLength: 25,
};