process.env.ENVIRONMENT = "TEST";

const app = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const Project = require("../models/projects");

const { expect } = chai;
chai.use(chaiHttp);

describe("Welcome to Project Testing!", () => {
    after(done => {
        Project.collection.deleteMany({});
        done();
    });
    describe("Test1", function () {
        it("Middleware getUser Failed 1", done => {
            chai.request(app)
                .post("/project")
                .send({ token: null })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });
        it("Middleware getUser Failed 2", done => {
            chai.request(app)
                .post("/project")
                .send({ token: "123456789" })
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    done();
                });
        });
    });

    describe("Test2", function () {
        it("POST Project Success", done => {
            chai.request(app)
                .post("/project/create")
                .send({ token: process.env.TEST_TOKEN, title: "Project Test" })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    done();
                });
        });
        it("POST Project Failed", done => {
            chai.request(app)
                .post("/project/create")
                .send({ token: process.env.TEST_TOKEN, title: null })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });
        it("GET Project Sucess", done => {
            chai.request(app)
                .post("/project")
                .send({ token: process.env.TEST_TOKEN })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
    });
    describe("Test3", function () {
        let post_id;
        before(done => {
            chai.request(app)
                .post("/project/create")
                .send({ token: process.env.TEST_TOKEN, title: "GET ID TEST" })
                .end((err, res) => {
                    post_id = res.body._id;
                    done();
                });
        });
        it("GET Project by id Success", done => {
            chai.request(app)
                .get(`/project/${post_id}`)
                .send({ token: process.env.TEST_TOKEN })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    done();
                });
        });
        it("GET Project by id Failed", done => {
            chai.request(app)
                .get("/project/123456")
                .send({ token: process.env.TEST_TOKEN })
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    done();
                });
        });
        it("PATCH Project by id Success", done => {
            chai.request(app)
                .patch(`/project/${post_id}`)
                .send({ token: process.env.TEST_TOKEN, title: "PATCH ID TEST" })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    done();
                });
        });
        it("PATCH Project by id Failed", done => {
            chai.request(app)
                .patch("/project/123456")
                .send({ token: process.env.TEST_TOKEN, title: "PATCH ID TEST" })
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    done();
                });
        });
    });
});
