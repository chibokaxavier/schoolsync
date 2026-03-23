import axios from 'axios';

async function test() {
    try {
        const signupRes = await axios.post('http://localhost:5000/api/auth/signup', {
            email: 'test@example.com',
            password: 'password123',
            role: 'student',
            firstName: 'Test',
            lastName: 'User',
            regNumber: '12345',
            grade: '10'
        });
        console.log('Signup success:', signupRes.data);

        const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'test@example.com',
            password: 'password123'
        });
        console.log('Login success:', loginRes.data);
    } catch (err: any) {
        console.error('Test failed:', err.response?.data || err.message);
    }
}

test();
