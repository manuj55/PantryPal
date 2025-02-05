const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('../models/user');
const VerificationToken = require('../models/VerificationToken');

// Setup in-memory MongoDB
let mongoServer;
beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const uri = mongoServer.getUri();
	await mongoose.connect(uri);
});

// Cleanup database before each test
beforeEach(async () => {
	await User.deleteMany({});
	await VerificationToken.deleteMany({});
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

// (Mocks and routes remain unchanged below)

jest.mock('../routes/auth/util', () => ({
	verifyRole: () => (req, res, next) => next(),
	restrictUserToOwnData: (req, res, next) => next(),
}));

// Mock nodemailer to avoid sending real emails
jest.mock('nodemailer', () => {
	return {
		createTransport: () => ({
			verify: (cb) => cb(null),
			sendMail: jest.fn().mockResolvedValue(true),
		}),
	};
});

jest.setTimeout(30000); // 30 seconds timeout

app.use(express.json());
const userRoute = require('../routes/userRoute');
app.use('/api/users', userRoute);

describe('User Route Endpoints', () => {
	// Cleanup database before each test
	beforeEach(async () => {
		await User.deleteMany({});
		await VerificationToken.deleteMany({});
	});

	test('POST /api/users/ - Successful registration', async () => {
		const userData = {
			name: 'Test User',
			email: 'testuser@example.com',
			password: 'TestPass123!',
		};

		const res = await request(app)
			.post('/api/users/')
			.send(userData);
		expect(res.status).toBe(201);
		expect(res.body).toHaveProperty('_id');
		expect(res.body).toHaveProperty('email', userData.email);
	});

	test('POST /api/users/ - Registration missing fields returns 400', async () => {
		const res = await request(app)
			.post('/api/users/')
			.send({ email: 'incomplete@example.com' });
		expect(res.status).toBe(400);
		expect(res.body).toHaveProperty('msg', 'Please provide all fields');
	});

	test('POST /api/users/ - Duplicate registration returns 400', async () => {
		const userData = {
			name: 'Test Duplicate',
			email: 'duplicate@example.com',
			password: 'TestPass123!',
		};

		// First registration
		await request(app).post('/api/users/').send(userData);
		// Attempt duplicate registration
		const res = await request(app).post('/api/users/').send(userData);
		expect(res.status).toBe(400);
		expect(res.body).toHaveProperty('msg', 'User already exists');
	});

	test('GET /api/users/ - Retrieve all users', async () => {
		// Create two users
		await request(app).post('/api/users/').send({
			name: 'User One',
			email: 'one@example.com',
			password: 'Pass123!',
		});
		await request(app).post('/api/users/').send({
			name: 'User Two',
			email: 'two@example.com',
			password: 'Pass123!',
		});
		const res = await request(app).get('/api/users/');
		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBeTruthy();
		expect(res.body.length).toBe(2);
	});

	test('GET /api/users/:id - Retrieve user by id', async () => {
		const registerRes = await request(app).post('/api/users/').send({
			name: 'User Detail',
			email: 'detail@example.com',
			password: 'Pass123!',
		});
		const userId = registerRes.body._id;

		const res = await request(app).get(`/api/users/${userId}`);
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('_id', userId);
		expect(res.body).toHaveProperty('email', 'detail@example.com');
	});

	test('GET /api/users/:id - Non-existent user returns 404', async () => {
		const fakeId = new mongoose.Types.ObjectId();
		const res = await request(app).get(`/api/users/${fakeId}`);
		expect(res.status).toBe(404);
		expect(res.body).toHaveProperty('msg', 'User not found');
	});

	test('PUT /api/users/:id - Successfully update user data', async () => {
		const registerRes = await request(app).post('/api/users/').send({
			name: 'User Update',
			email: 'update@example.com',
			password: 'Pass123!',
		});
		const userId = registerRes.body._id;
		const updateData = { name: 'Updated Name', address: '123 New Street' };

		const res = await request(app).put(`/api/users/${userId}`).send(updateData);
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('_id', userId);
		expect(res.body).toHaveProperty('name', 'Updated Name');
		expect(res.body).toHaveProperty('address', '123 New Street');
	});

	test('PUT /api/users/:id - Attempt to change password returns 400', async () => {
		const registerRes = await request(app).post('/api/users/').send({
			name: 'User No Password Change',
			email: 'nopass@example.com',
			password: 'Pass123!',
		});
		const userId = registerRes.body._id;
		const updateData = { password: 'NewPass456!' };

		const res = await request(app).put(`/api/users/${userId}`).send(updateData);
		expect(res.status).toBe(400);
		expect(res.body).toHaveProperty('msg', 'Password cannot be changed');
	});

	test('PUT /api/users/:id - Updating with duplicate email returns 400', async () => {
		// Create first user
		const firstRes = await request(app).post('/api/users/').send({
			name: 'User One',
			email: 'unique1@example.com',
			password: 'Pass123!',
		});
		// Create second user
		const secondRes = await request(app).post('/api/users/').send({
			name: 'User Two',
			email: 'unique2@example.com',
			password: 'Pass123!',
		});
		const secondId = secondRes.body._id;

		// Attempt to update second user's email to first user's email
		const res = await request(app).put(`/api/users/${secondId}`).send({ email: 'unique1@example.com' });
		expect(res.status).toBe(400);
		expect(res.body).toHaveProperty('msg', 'Email is already used by other user');
	});

	test('DELETE /api/users/:id - Successfully delete a user', async () => {
		const registerRes = await request(app).post('/api/users/').send({
			name: 'User Delete',
			email: 'delete@example.com',
			password: 'Pass123!',
		});
		const userId = registerRes.body._id;

		const res = await request(app).delete(`/api/users/${userId}`);
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('_id', userId);

		// Confirm deletion by trying to get the deleted user
		const getRes = await request(app).get(`/api/users/${userId}`);
		expect(getRes.status).toBe(404);
	});

	test('DELETE /api/users/:id - Deleting non-existent user returns 404', async () => {
		const fakeId = new mongoose.Types.ObjectId();
		const res = await request(app).delete(`/api/users/${fakeId}`);
		expect(res.status).toBe(404);
		expect(res.body).toHaveProperty('msg', 'User not found');
	});
});