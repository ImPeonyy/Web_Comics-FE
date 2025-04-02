import style from './style.module.scss';

const FormButton = ({ title, ...props }) => {
    return (
        <button {...props} className={style.formButton}>
            {title}
        </button>
    );
};

export default FormButton;
