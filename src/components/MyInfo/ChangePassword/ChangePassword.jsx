import * as Yup from 'yup';

import { useContext, useState } from 'react';

import CustomLoading from '@components/Loading/CustomLoading/CustomLoading';
import FormButton from '@components/MyInfo/FormButton/FormButton';
import FormInput from '@components/MyInfo/FormInput/FormInput';
import { ToastContext } from '@contexts/ToastProvider';
import { changePassword } from '@services/UserService';
import style from './style.module.scss';
import { useFormik } from 'formik';

const ChangePassword = () => {
    const { toast } = useContext(ToastContext);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            oldPassword: Yup.string()
                .min(6, 'Mật khẩu phải có ít nhất 6 kí tự!')
                .required('Mật khẩu là bắt buộc!'),
            newPassword: Yup.string()
                .min(6, 'Mật khẩu phải có ít nhất 6 kí tự!')
                .required('Mật khẩu là bắt buộc!'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không khớp!')
                .required('Mật khẩu là bắt buộc!')
        }),

        onSubmit: (values) => {
            setIsUpdatingPassword(true);
            changePassword(values)
                .then(() => {
                    toast.success('Đổi mật khẩu thành công!');
                    setIsEditingPassword(false);
                    formik.resetForm();
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                })
                .finally(() => {
                    setIsUpdatingPassword(false);
                });
        }
    });

    const handleEditablePassword = (e) => {
        e.stopPropagation();
        setIsEditingPassword(!isEditingPassword);
        formik.resetForm();
    };

    return (
        <form onSubmit={formik.handleSubmit} className={style.passwordForm}>
            {isUpdatingPassword ? (
                <div className={style.loadingPassword}>
                    <CustomLoading text='Đang cập nhật mật khẩu...' />
                </div>
            ) : (
                <>
                    <FormInput
                        type='password'
                        name='oldPassword'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.oldPassword}
                        autoComplete='off'
                        disabled={!isEditingPassword}
                        title={'Mật khẩu cũ'}
                        formik={formik}
                    />

                    <FormInput
                        type='password'
                        name='newPassword'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.newPassword}
                        autoComplete='off'
                        disabled={!isEditingPassword}
                        title={'Mật khẩu mới'}
                        formik={formik}
                    />

                    <FormInput
                        type='password'
                        name='confirmPassword'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        autoComplete='off'
                        disabled={!isEditingPassword}
                        title={'Xác nhận mật khẩu'}
                        formik={formik}
                    />
                    {isEditingPassword ? (
                        <>
                            <div className={style.action}>
                                <FormButton
                                    type='button'
                                    onClick={handleEditablePassword}
                                    title={'Hủy'}
                                />
                                <FormButton type='submit' title={'Cập nhật'} />
                            </div>
                        </>
                    ) : (
                        <FormButton
                            type='button'
                            onClick={handleEditablePassword}
                            title={'Chỉnh sửa'}
                        />
                    )}
                </>
            )}
        </form>
    );
};

export default ChangePassword;
