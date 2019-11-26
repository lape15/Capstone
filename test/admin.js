const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const { expect } = chai;
// const request = require('supertest');
// const assert = require('assert');


chai.use(chaiHttp);
chai.should();

// auth super user

describe('Admin tests', () => {
  it('should return error 404 for invalid credentials', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: '',
        password: '',
      })
      .end((_err, res) => {
        res.should.have.status(404);
      });
    done();
  });

  it('should return 200 and token for valid credentials', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'lara@gmail.com',
        password: 'password',
      })
      .end((_err, res) => {
        res.should.have.status(200);
        expect(res.body.user.role).to.exist;
        expect(res.body.token).to.exist;
        expect(res.body.user.password).to.not.exist;
        expect(res.body.message).to.be.equal('Logged in sucessfully.');
      });
    done();
  });

  it('should return error 401 if no valid token provided', (done) => {
    // sed request with no token
    chai.request(app).get('/api/v1/users')
      .set('Authorization', '')
      .then((res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.be.equal('Access Denied');
        done();
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
});
