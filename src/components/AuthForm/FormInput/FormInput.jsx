import style from './style.module.scss';

const FormInput = ({ ...props }) => {

    const {formik, name} = props;
    const isError = formik.errors[name] && formik.touched[name];
    const errorMessage = formik.errors[name];

    return (
        <div className={style.input}>
            <input
                {...props}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values[name]}
            />
            <div className={style.error}>
                {isError && (
                        <div>{errorMessage}</div>
                    )}
            </div>
        </div>
    );
};

export default FormInput;
