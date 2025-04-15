import { LoadingOutlined } from '@ant-design/icons';
import style from './style.module.scss';

const FormButton = ({ title, isLoading, ...props }) => {
    return (
        <button {...props} className={style.button}>
            {isLoading ? (
                <LoadingOutlined style={{ fontSize: '35px' }} />
            ) : (
                title
            )}
        </button>
    );
};

export default FormButton;
