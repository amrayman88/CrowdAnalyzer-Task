const mongoose = require("mongoose");
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');
const config = require('../config')

const { StatusCodes } = require('http-status-codes');
const { DashboardModel } = require('../src/models');

chai.use(chaiHttp);

describe('Dashboard', () => {
    before((done) => {
        DashboardModel.deleteMany({}, (err) => {
            done(err);
        })
    })
    after((done) => {
        DashboardModel.deleteMany({}, (err) => {
            done(err);
        })
    })
    let dashboards = []
    describe('/GET dashboards', () => {
        it('it should get 0 books', (done) => {
            chai.request(server)
                .get('/dashboard')
                .end((err, res) => {
                    res.should.have.status(StatusCodes.OK)
                    res.body.should.be.a('array')
                    res.body.length.should.be.eql(0)
                    done(err)
                })
        })
    })
    for (let i = 0; i < 5; i++) {
        describe('/POST dashboard', () => {
            it(`it should post dashboard #${i} with 0 charts`, (done) => {
                const dashboard = {
                    title: `Dashboard ${i}`,
                    description: 'This is a testing Dashboard'
                }
                chai.request(server)
                    .post('/dashboard')
                    .send(dashboard)
                    .end((err, res) => {
                        res.should.have.status(StatusCodes.CREATED)
                        res.body.should.be.a('object')
                        res.body.charts.length.should.be.eql(0)
                        dashboards.push(res.body)
                        done(err)
                    })
            })
        })
    }
    describe('/POST dashboard', () => {
        it(`it should not post dashboard with title size > ${config.dahsboardTitleMaxLength}`, (done) => {
            const dashboard = {
                title: 'Dashboard 1Dashboard 1Dashboard 1Dashboard 1Dashboard 1',
                description: 'This is a testing Dashboard'
            }
            chai.request(server)
                .post('/dashboard')
                .send(dashboard)
                .end((err, res) => {
                    res.should.have.status(StatusCodes.BAD_REQUEST)
                    res.error.text.should.be.eql(
                        `Dashboard validation failed: title: Path \`title\` (\`${dashboard.title}\`) is longer than the maximum allowed length (${config.dahsboardTitleMaxLength}).`)
                    done(err)
                })
        })
    })
    describe('/POST dashboard', () => {
        it(`it should not post dashboard with description size > ${config.dahsboardDiscriptionMaxLength}`, (done) => {
            let desc = ''
            for (let i = 0; i < 205; i++) {
                desc = desc + 'a'
            }
            const dashboard = {
                title: 'Dashboard 1',
                description: desc
            }
            chai.request(server)
                .post('/dashboard')
                .send(dashboard)
                .end((err, res) => {
                    res.should.have.status(StatusCodes.BAD_REQUEST)
                    res.error.text.should.be.eql(
                        `Dashboard validation failed: description: Path \`description\` (\`${dashboard.description}\`) is longer than the maximum allowed length (${config.dahsboardDiscriptionMaxLength}).`)
                    done(err)
                })
        })
    })
    describe('/DELETE dashboard', () => {
        it('it should delete ', (done) => {
            chai.request(server)
                .delete('/dashboard/' + dashboards[0]._id)
                .end((err, res) => {
                    res.should.have.status(StatusCodes.OK)
                    res.text.should.be.eql('Dashboard deleted!')
                    done(err)
                })
        })
    })
    describe('/DELETE dashboard', () => {
        it('it should not find the dashboard to delete', (done) => {
            chai.request(server)
                .delete('/dashboard/' + dashboards[0]._id)
                .end((err, res) => {
                    res.should.have.status(StatusCodes.NOT_FOUND)
                    res.error.text.should.be.eql('Dashboard not found!')
                    done(err)
                })
        })
    })
    describe('/GET dashboards', () => {
        it('it should get 4 books', (done) => {
            chai.request(server)
                .get('/dashboard')
                .end((err, res) => {
                    res.should.have.status(StatusCodes.OK)
                    res.body.should.be.a('array')
                    res.body.length.should.be.eql(4)
                    done(err)
                })
        })
    })
    for (let i = 0; i < 5; i++) {
        describe('/POST chatrs', () => {
            it(`it should post chart #${i + 1} to Dashboard 1`, (done) => {
                const chart = {
                    title: `chart ${i + 1}`,
                    type: 'pie',
                    dateRange: {
                        from: '2021-06-20',
                        to: '2021-06-21'
                    },
                    interval: 'hour',
                    dashboardId: dashboards[1]._id,
                }
                chai.request(server)
                    .post('/dashboard/chart')
                    .send(chart)
                    .end((err, res) => {
                        res.should.have.status(StatusCodes.OK)
                        res.text.should.be.eql('Chart added to Dashboard!')
                        done(err)
                    })
            })
        })
    }
    describe('/DELETE dashboard', () => {
        it('it should delete ', (done) => {
            chai.request(server)
                .delete('/dashboard/' + dashboards[1]._id)
                .end((err, res) => {
                    res.should.have.status(StatusCodes.OK)
                    res.text.should.be.eql('Dashboard deleted!')
                    done(err)
                })
        })
    })
})
