process.env.ENVIRONMENT = "TEST";

const app = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const Todo = require("../models/todos");
const Project = require("../models/projects");

const { expect } = chai;
chai.use(chaiHttp);

describe("Welcome to Todos Testing!", () => {
    after(done => {
        Todo.collection.deleteMany({});
        Project.collection.deleteMany({});
        done();
    });
    describe("Test1", function () {
        it("POST validProject Failed", done => {
            chai.request(app)
                .post("/todo/create")
                .send({ token: process.env.TEST_TOKEN, project: "123456", description: "123" })
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    done();
                });
        });
    });
    describe("Test2", function () {
        let project;
        before(done => {
            chai.request(app)
                .post("/project/create")
                .send({ token: process.env.TEST_TOKEN, title: "Project Test" })
                .end((err, res) => {
                    project = res.body._id;
                    done();
                });
        });
        it("POST Todo Success", done => {
            chai.request(app)
                .post("/todo/create")
                .send({ token: process.env.TEST_TOKEN, project: project, description: "Testing 1" })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an("object");
                    done();
                });
        });
        it("POST Todo Failed", done => {
            chai.request(app)
                .post("/todo/create")
                .send({ token: process.env.TEST_TOKEN, project: project, description: null })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });
        it("GET Project Sucess", done => {
            chai.request(app)
                .post("/todo")
                .send({ token: process.env.TEST_TOKEN, project: project })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
    });
    describe("Test3", function () {
        let project;
        let todo_id;
        before(done => {
            chai.request(app)
                .post("/project/create")
                .send({ token: process.env.TEST_TOKEN, title: "Project Test" })
                .end((err, res) => {
                    project = res.body._id;
                    done();
                });
        });
        before(done => {
            chai.request(app)
                .post("/todo/create")
                .send({
                    token: process.env.TEST_TOKEN,
                    project: project,
                    description: "Testing GET & PATCH id",
                })
                .end((err, res) => {
                    todo_id = res.body._id;
                    done();
                });
        });
        it("GET Todo by id Success", done => {
            chai.request(app)
                .get(`/todo/${todo_id}`)
                .send({ token: process.env.TEST_TOKEN })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    done();
                });
        });
        it("GET Todo by id Failed", done => {
            chai.request(app)
                .get("/todo/123456")
                .send({ token: process.env.TEST_TOKEN })
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    done();
                });
        });
        it("PATCH Todo by id Success 1", done => {
            chai.request(app)
                .patch(`/todo/${todo_id}`)
                .send({ token: process.env.TEST_TOKEN, description: "PATCH ID TEST" })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    done();
                });
        });
        it("PATCH Todo by id Success 2", done => {
            chai.request(app)
                .patch(`/todo/${todo_id}`)
                .send({ token: process.env.TEST_TOKEN, status: true })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    done();
                });
        });
        it("PATCH Todo by id Success 3", done => {
            chai.request(app)
                .patch(`/todo/${todo_id}`)
                .send({ token: process.env.TEST_TOKEN, description: "PATCH ID TEST FINAL", status: true })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    done();
                });
        });
        it("PATCH Project by id Failed", done => {
            chai.request(app)
                .patch("/todo/123456")
                .send({ token: process.env.TEST_TOKEN, description: "PATCH ID TEST" })
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    done();
                });
        });
    });
    describe("Test4", function () {
        let project;
        let todo_id;
        before(done => {
            chai.request(app)
                .post("/project/create")
                .send({ token: process.env.TEST_TOKEN, title: "Project Test" })
                .end((err, res) => {
                    project = res.body._id;
                    done();
                });
        });
        before(done => {
            chai.request(app)
                .post("/todo/create")
                .send({
                    token: process.env.TEST_TOKEN,
                    project: project,
                    description: "Testing GET & PATCH id",
                })
                .end((err, res) => {
                    todo_id = res.body._id;
                    done();
                });
        });
        it("DELETE Todo by id Failed", done => {
            chai.request(app)
                .delete("/todo/123456")
                .send({ token: process.env.TEST_TOKEN })
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    done();
                });
        });
        it("DELETE Todo by id Success", done => {
            chai.request(app)
                .delete(`/todo/${todo_id}`)
                .send({ token: process.env.TEST_TOKEN })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    done();
                });
        });
    });
});
