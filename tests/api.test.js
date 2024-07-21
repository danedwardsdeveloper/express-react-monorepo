import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
const chai = use(chaiHttp);
import request from 'supertest';

import app from '../src/server/app/app.js';

describe('API Tests', () => {
	describe('GET /api', () => {
		it('should return JSON with "Express React Monorepo API"', (done) => {
			request(app)
				.get('/api')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).to.have.property(
						'message',
						'Express React Monorepo API'
					);
					done();
				});
		});
	});

	describe('POST /api/login', () => {
		it('should login successfully with correct credentials', (done) => {
			request(app)
				.post('/api/login')
				.send({ email: 'user@gmail.com', password: 'securePassword' })
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).to.have.property('message', 'Login successful');
					expect(res).to.have.cookie('token');
					done();
				});
		});

		it('should fail login with incorrect email', (done) => {
			request(app)
				.post('/api/login')
				.send({ email: 'wronguser@gmail.com', password: 'securePassword' })
				.expect('Content-Type', /json/)
				.expect(401)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).to.have.property(
						'message',
						'Invalid credentials'
					);
					expect(res).to.not.have.cookie('token');
					done();
				});
		});

		it('should fail login with incorrect password', (done) => {
			request(app)
				.post('/api/login')
				.send({ email: 'user@gmail.com', password: 'wrongPassword' })
				.expect('Content-Type', /json/)
				.expect(401)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).to.have.property(
						'message',
						'Invalid credentials'
					);
					expect(res).to.not.have.cookie('token');
					done();
				});
		});
	});
});
