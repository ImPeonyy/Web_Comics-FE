import * as Yup from 'yup';

import { updateInfo, uploadAvatar } from '@services/UserService';
import { useContext, useState } from 'react';

import FormButton from '@components/MyInfo/FormButton/FormButton';
import FormInput from '@components/MyInfo/FormInput/FormInput';
import { LevelsContext } from '@contexts/LevelsProvider';
import Loading from '@components/Loading/Loading';
import { StoreContext } from '@contexts/StoreProvider';
import { ToastContext } from '@contexts/ToastProvider';
import style from './style.module.scss';
import { useFormik } from 'formik';

const Info = () => {
    const { toast } = useContext(ToastContext);
    const { myInfo } = useContext(StoreContext);
    const [isEditingInfo, setIsEditingInfo] = useState(false);
    const { currentLevel, nextLevel, expPercentage } =
        useContext(LevelsContext);

    const formik = useFormik({
        initialValues: {
            username: myInfo?.username || '',
            email: myInfo?.email || ''
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            username: Yup.string()
                .max(50, 'Tên người dùng không được nhiều hơn 50 kí tự!')
                .required('Tên người dùng là bắt buộc!'),
            email: Yup.string()
                .email('Email không hợp lệ!')
                .required('Email là bắt buộc!')
        }),

        onSubmit: (values) => {
            updateInfo(values)
                .then(() => {
                    toast.success('Cập nhật thông tin thành công!');
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                })
                .catch((err) => {
                    if (Array.isArray(err.response.data.messages)) {
                        err.response.data.messages.forEach((msg) => {
                            toast.error(msg);
                        });
                    } else {
                        toast.error(err.response.data.message);
                    }
                });
        }
    });

    // const avatar = useFormik({
    //     initialValues: {
    //         avatar: null
    //     },
    //     validationSchema: Yup.object({
    //         avatar: Yup.test(
    //             'fileType',
    //             'Chỉ chấp nhận ảnh JPEG, PNG, JPG hoặc GIF',
    //             (value) =>
    //                 value &&
    //                 [
    //                     'image/jpeg',
    //                     'image/png',
    //                     'image/jpg',
    //                     'image/gif'
    //                 ].includes(value.type)
    //         ).test(
    //             'fileSize',
    //             'Kích thước ảnh tối đa 2MB',
    //             (value) => value && value.size <= 2048 * 1024
    //         )
    //     }),
    //     handleChange: (values) => {
    //         const { avatar } = values;
    //     }
    // });

    const handleEditableInfo = (e) => {
        e.stopPropagation();
        setIsEditingInfo(!isEditingInfo);
        formik.resetForm();
    };

    const handleUploadAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadAvatar(file)
                .then(() => {
                    toast.success('Avatar đã được cập nhật!');
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                })
                .catch((err) => {
                    const status = err.response.status;
                    if (status === 422) {
                        toast.error('Avatar phải là ảnh!');
                    }
                    if (status === 413) {
                        toast.error('Kích thước ảnh tối đa 2MB!');
                    }
                });
        } else {
            toast.error('Vui lòng chọn ảnh!');
        }
    };

    if (!myInfo || (myInfo.username === null && myInfo.email === null)) {
        return (
            <div className={style.loading}>
                <Loading size='large' />
            </div>
        );
    }

    return (
        <div className={style.infoContainer}>
            <div style={{ display: 'flex', gap: '20px', flexDirection: 'row' }}>
                <div className={style.avatarContainer}>
                    <div className={style.avatar}>
                        <img src={myInfo.avatar} />
                        <input
                            type='file'
                            name='avatar'
                            id='avatar'
                            accept='image/*'
                            onChange={handleUploadAvatar}
                            // onBlur={formik.handleBlur}
                            className={style.avatarInput}
                        />
                    </div>
                </div>
                <div style={{ flex: 1 }}>
                    <div className={style.info}>
                        <form
                            onSubmit={formik.handleSubmit}
                            className={style.infoForm}
                        >
                            <FormInput
                                type='text'
                                name='username'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                autoComplete='off'
                                disabled={!isEditingInfo}
                                title={'Tên người dùng'}
                                formik={formik}
                            />

                            <FormInput
                                type='text'
                                name='email'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                autoComplete='off'
                                disabled={!isEditingInfo}
                                title={'Email'}
                                formik={formik}
                            />
                            {isEditingInfo ? (
                                <>
                                    <div className={style.action}>
                                        <FormButton
                                            type='button'
                                            onClick={handleEditableInfo}
                                            title={'Hủy'}
                                        />
                                        <FormButton
                                            type='submit'
                                            title={'Cập nhật'}
                                        />
                                    </div>
                                </>
                            ) : (
                                <FormButton
                                    type='button'
                                    onClick={handleEditableInfo}
                                    title={'Chỉnh sửa'}
                                />
                            )}
                        </form>
                    </div>
                </div>
            </div>
            <div className={style.experienceContainer}>
                <div className={style.experience}>
                    <div className={style.experienceTitle}>
                        <h2>Tu Vi</h2>
                    </div>
                    <div className={style.experienceLevel}>
                        <h3>{currentLevel.name}</h3>
                        <h3>{nextLevel.name}</h3>
                    </div>
                    <div className={style.experienceBar}>
                        <span
                            className={style.experienceValue}
                            style={{ width: `${expPercentage}%` }}
                        >
                            {expPercentage}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Info;
