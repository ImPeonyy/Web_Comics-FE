import axiosClient from '@services/axiosClient';

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

export { getMyInfo, uploadAvatar, changePassword, updateInfo };
