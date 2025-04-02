import axiosClient from '@services/axiosClient';

const signUp = async (body) => {
    return await axiosClient.post('/register', body);
};

const signIn = async (body) => {
    return await axiosClient.post('/login', body);
};

const signOut = async (body) => {
    return await axiosClient.post('/logout', body);
};

export { signUp, signIn, signOut };
