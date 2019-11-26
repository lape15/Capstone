const chai = require('chai');
const app = require('../app');

const { expect } = chai;
// const server = require('../server');

describe('test', () => {
  it('Should exists', () => {
    expect(app).to.be.a('function');
  });

  it('Returns 404 error for non defined routes', (done) => {
    chai.request(app).get('/unexisting').then((res) => {
      expect(res).to.have.status(404);
      done();
    });
  });
});

describe('tests', () => {
  it('fetch employees', (done) => {
    // mock login to get token
    const validInput = {
      email: 'lara@gmail.com',
      password: 'password',
    };
    // send login request to the app to receive token
    chai.request(app).post('/api/v1/auth/login')
      .send(validInput)
      .then((loginResponse) => {
        // add token to next request Authorization headers as Bearer adw3R£$4wF43F3waf4G34fwf3wc232!w1C"3F3VR
        const token = `Bearer ${loginResponse.body.token}`;
        chai.request(app).get('/api/v1/employees')
          .set('Authorization', token)
          .then((res) => {
            // assertions
            expect(res).to.have.status(200);
            expect(res.body.data).to.exist;
            done();
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  it('fetch users', (done) => {
    // mock login to get token
    const validInput = {
      email: 'iamweezykon@gmail.com',
      password: 'password',
    };
    // send login request to the app to receive token
    chai.request(app).post('/api/v1/auth/login')
      .send(validInput)
      .then((loginResponse) => {
        // add token to next request Authorization headers as Bearer adw3R£$4wF43F3waf4G34fwf3wc232!w1C"3F3VR
        const token = `Bearer ${loginResponse.body.token}`;
        chai.request(app).get('/api/v1/users')
          .set('Authorization', token)
          .then((res) => {
            // assertions
            expect(res).to.have.status(200);
            expect(res.body.data).to.exist;
            done();
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  // it('create user with 201', (done) => {
  //   // mock login to get token
  //   const validInput = {
  //     email: 'weezykon@gmail.com',
  //     password: 'password',
  //   };
  //   // send login request to the app to receive token
  //   chai.request(app).post('/api/v1/auth/login')
  //     .send(validInput)
  //     .then((loginResponse) => {
  //       // add token to next request Authorization headers as Bearer adw3R£$4wF43F3waf4G34fwf3wc232!w1C"3F3VR
  //       const token = `Bearer ${loginResponse.body.token}`;
  //       console.log(token);
  //       const user = {
  //         fullname: 'John Wick',
  //         email: 'johnwick@wick.com',
  //         jobrole: 'admin',
  //         phone: '8937648383',
  //         gender: 'Male',
  //         address: 'dhjcehktdfjhrhjjtftgh5krjt',
  //         department: 'IT',
  //       };
  //       chai.request(app).post('/api/v1/auth/createuser')
  //         .send(user)
  //         .set('Authorization', token)
  //         .then((res) => {
  //           // assertions
  //           expect(res).to.have.status(201);
  //           expect(res.body.message).to.be.equal('User account successfully created');
  //           done();
  //         })
  //         .catch((err) => {
  //           console.log(err.message);
  //         });
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // });

  it('create user with existing email then return 400', (done) => {
    // mock login to get token
    const validInput = {
      email: 'lara@gmail.com',
      password: 'password',
    };
    // send login request to the app to receive token
    chai.request(app).post('/api/v1/auth/login')
      .send(validInput)
      .then((loginResponse) => {
        // add token to next request Authorization headers as Bearer adw3R£$4wF43F3waf4G34fwf3wc232!w1C"3F3VR
        const token = `Bearer ${loginResponse.body.token}`;
        console.log(token);
        const user = {
          fullname: 'John Wick',
          email: 'weezykon@gmail.com',
          jobrole: 'admin',
          phone: '8937648383',
          gender: 'Male',
          address: 'dhjcehktdfjhrhjjtftgh5krjt',
          department: 'IT',
        };
        chai.request(app).post('/api/v1/auth/createuser')
          .send(user)
          .set('Authorization', token)
          .then((res) => {
            // assertions
            expect(res).to.have.status(400);
            // expect(res.body.message).to.be.equal('User account successfully created');
            done();
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
});
