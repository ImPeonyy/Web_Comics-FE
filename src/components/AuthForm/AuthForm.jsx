import * as Yup from 'yup';

import { signIn, signUp } from '@services/AuthService';

import { AuthFormContext } from '@contexts/AuthFormProvider';
import Cookies from 'js-cookie';
import FormButton from '@components/AuthForm/FormButton/FormButton';
import FormInput from '@components/AuthForm/FormInput/FormInput';
import { ToastContext } from '@contexts/ToastProvider';
import style from './style.module.scss';
import { useContext } from 'react';
import { useFormik } from 'formik';

const AuthForm = () => {
    const { toast } = useContext(ToastContext);
    const { isAuthFormOpen, setIsAuthFormOpen } = useContext(AuthFormContext);

    const handleOverlayClick = () => {
        setIsAuthFormOpen(false);
    };

    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    const formikSignIn = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Email không hợp lệ!')
                .required('Email là bắt buộc!'),
            password: Yup.string()
                .min(6, 'Mật khẩu phải có ít nhất 6 kí tự!')
                .required('Mật khẩu là bắt buộc!')
        }),

        onSubmit: (values) => {
            const { email, password } = values;
            signIn({ email, password })
                .then((res) => {
                    window.location.reload();
                    const { token, id } = res.data;
                    Cookies.set('token', token);
                    Cookies.set('userID', id);
                    setIsAuthFormOpen(false);
                })
                .catch((err) => {
                    toast.error('Sai tài khoản hoặc mật khẩu!');
                    console.log(err);
                });
        }
    });

    const formikSignUp = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .max(50, 'Tên người dùng không được nhiều hơn 50 kí tự!')
                .required('Tên người dùng là bắt buộc!'),
            email: Yup.string()
                .email('Email không hợp lệ!')
                .required('Email là bắt buộc!'),
            password: Yup.string()
                .min(6, 'Mật khẩu phải có ít nhất 6 kí tự!')
                .required('Mật khẩu là bắt buộc!'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
                .required('Mật khẩu là bắt buộc!')
        }),
        onSubmit: (values, { resetForm }) => {
            const { username, email, password, confirmPassword } = values;
            signUp({ username, email, password, confirmPassword })
                .then((res) => {
                    toast.success(res.data.message);
                    resetForm();
                    document.getElementById('chk').checked = false;
                })
                .catch((err) => {
                    toast.error('Sai tài khoản hoặc mật khẩu!');
                    console.log(err);
                });
        }
    });

    return (
        <>
            {isAuthFormOpen && (
                <div className={style.background} onClick={handleOverlayClick}>
                    <div className={style.modal} onClick={handleContentClick}>
                        <input
                            type='checkbox'
                            id='chk'
                            className={style.chk}
                            aria-hidden='true'
                        />
                        <div className={style.signIn}>
                            <form
                                onSubmit={formikSignIn.handleSubmit}
                                className={style.authForm}
                            >
                                <label htmlFor='chk' aria-hidden='true'>
                                    Đăng Nhập
                                </label>
                                <FormInput
                                    type='text'
                                    name='email'
                                    placeholder='Email'
                                    required
                                    formik={formikSignIn}
                                />
                                <FormInput
                                    type='password'
                                    name='password'
                                    placeholder='Mật khẩu'
                                    required
                                    formik={formikSignIn}
                                />
                                <FormButton type='submit' title={'Đăng Nhập'} />
                            </form>
                        </div>

                        <div className={style.signUp}>
                            <form
                                onSubmit={formikSignUp.handleSubmit}
                                className={style.authForm}
                            >
                                <label htmlFor='chk' aria-hidden='true'>
                                    Đăng ký
                                </label>
                                <FormInput
                                    type='text'
                                    name='username'
                                    placeholder='Tên người dùng'
                                    // required
                                    formik={formikSignUp}
                                />
                                <FormInput
                                    type='email'
                                    name='email'
                                    placeholder='Email'
                                    required
                                    formik={formikSignUp}
                                />
                                <FormInput
                                    type='password'
                                    name='password'
                                    placeholder='Mật khẩu'
                                    required
                                    formik={formikSignUp}
                                />
                                <FormInput
                                    type='password'
                                    name='confirmPassword'
                                    placeholder='Xác nhận mật khẩu'
                                    required
                                    formik={formikSignUp}
                                />
                                <FormButton type='submit' title={'Đăng Ký'} />
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AuthForm;
