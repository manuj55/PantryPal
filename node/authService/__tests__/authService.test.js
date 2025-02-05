const request = require('supertest');
const express = require('express');
const bcrypt = require('bcryptjs');

// Mock the util module used in the login route
jest.mock('../routes/auth/util', () => ({
	fetchUsers: jest.fn(),
	generateJWTWithPrivateKey: jest.fn()
}));
const { fetchUsers, generateJWTWithPrivateKey } = require('../routes/auth/util');

// Import the login route (assume the file is named loginRoute.js)
const loginRoute = require('../routes/auth/loginRoute');

describe('Login Route', () => {
	let app;

	beforeAll(() => {
		app = express();
		app.use(express.json());
		// Mount the route at /auth so that POST /user becomes /auth/user
		app.use('/auth', loginRoute);
	});

	test('Should return 400 if email is missing', async () => {
		const response = await request(app)
			.post('/auth/user')
			.send({ password: 'testpass' });
		expect(response.statusCode).toBe(400);
		expect(response.body).toHaveProperty('message', 'Email and password are required');
	});

	test('Should return 400 if password is missing', async () => {
		const response = await request(app)
			.post('/auth/user')
			.send({ email: 'user@example.com' });
		expect(response.statusCode).toBe(400);
		expect(response.body).toHaveProperty('message', 'Email and password are required');
	});

	test('Should return 404 if user not found', async () => {
		fetchUsers.mockResolvedValueOnce([]);
		const response = await request(app)
			.post('/auth/user')
			.send({ email: 'user@example.com', password: 'testpass' });
		expect(response.statusCode).toBe(404);
		expect(response.body).toHaveProperty('message', 'user not found');
	});

	test('Should return 400 if user not verified', async () => {
		const dummyUser = {
			_id: '1',
			email: 'user@example.com',
			password: 'hashedpassword',
			name: 'Test User',
			isVerified: false
		};
		fetchUsers.mockResolvedValueOnce([dummyUser]);
		const response = await request(app)
			.post('/auth/user')
			.send({ email: 'user@example.com', password: 'testpass' });
		expect(response.statusCode).toBe(400);
		expect(response.body).toHaveProperty('message', 'User not verified');
	});

	test('Should return 400 if password is invalid', async () => {
		const dummyUser = {
			_id: '1',
			email: 'user@example.com',
			password: 'hashedpassword',
			name: 'Test User',
			isVerified: true
		};
		fetchUsers.mockResolvedValueOnce([dummyUser]);
		jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);
		const response = await request(app)
			.post('/auth/user')
			.send({ email: 'user@example.com', password: 'wrongpassword' });
		expect(response.statusCode).toBe(400);
		expect(response.body).toHaveProperty('message', 'Invalid credentials');
	});

	test('Should return 200 and token on successful login', async () => {
		const dummyUser = {
			_id: '1',
			email: 'user@example.com',
			password: 'hashedpassword',
			name: 'Test User',
			isVerified: true
		};
		fetchUsers.mockResolvedValueOnce([dummyUser]);
		jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);
		const dummyToken = 'dummy_jwt_token';
		generateJWTWithPrivateKey.mockReturnValue(dummyToken);

		const response = await request(app)
			.post('/auth/user')
			.send({ email: 'user@example.com', password: 'correctpassword' });
		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty('access_token', dummyToken);
		expect(response.body).toHaveProperty('id', dummyUser._id);
		expect(response.body).toHaveProperty('name', dummyUser.name);
		expect(response.body).toHaveProperty('email', dummyUser.email);
	});
});