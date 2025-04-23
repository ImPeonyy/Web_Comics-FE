import axiosClient from '@services/axiosClient';

const getAllUsers = async () => {
    return await axiosClient.get('/admin/all-users');
};

const getMyInfo = async (id) => {
    return await axiosClient.get(`/users/${id}`);
};

const uploadAvatar = async (avatar) => {
    const formData = new FormData();
    formData.append('avatar', avatar);
    return await axiosClient.post('/users/upload-avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

const changePassword = async (body) => {
    return await axiosClient.post('/users/change-password', body);
};

const updateInfo = async (body) => {
    return await axiosClient.put('/users/update-info', body);
};

const getExp = async () => {
    return await axiosClient.get(`/users/exp`);
};

const increaseExp = async () => {
    return await axiosClient.post(`/users/increase-exp`);
};

const updateUser = async (id, body) => {
    return await axiosClient.put(`/admin/update-user/${id}`, body);
};

const deleteUser = async (id) => {
    return await axiosClient.delete(`/admin/delete-user/${id}`);
};

export {
    getMyInfo,
    uploadAvatar,
    changePassword,
    updateInfo,
    increaseExp,
    getExp,
    getAllUsers,
    updateUser,
    deleteUser
};
