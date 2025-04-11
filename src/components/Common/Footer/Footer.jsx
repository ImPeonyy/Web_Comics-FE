import Logo from '@images/main-logo-transparent.png';
import style from './style.module.scss';

const Footer = () => {
    return (
        <footer className={style.footer}>
            <div className={style.container}>
                <section className={style.footerInfo}>
                    <div className={style.footerLogo}>
                        <img src={Logo} alt='Trang Chủ' />
                    </div>
                    <div className={style.footerDes}>
                        <a href='/'>Peonyy~ Comics</a> - Đọc truyện online, đọc
                        truyện chữ, truyện tranh. Website luôn cập nhật những bộ
                        truyện mới nhất thuộc các thể loại đặc sắc như tiên
                        hiệp, truyện kiếm hiếp, hay truyện ngôn tình một cách
                        nhanh nhất. Hỗ trợ mọi thiết bị như di động và máy tính
                        bảng.
                    </div>
                    <div className={style.footerAboutMe}>
                        <h4>About me</h4>
                        <div>
                            Copyright © 2025{' '}
                            <span style={{ color: '#f3aab5' }}>
                                Peonyy~ Comics
                            </span>
                        </div>
                    </div>
                </section>
            </div>
        </footer>
    );
};

export default Footer;
