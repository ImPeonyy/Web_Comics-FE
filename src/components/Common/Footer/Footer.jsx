import {
    FacebookOutlined,
    GithubOutlined,
    InstagramOutlined
} from '@ant-design/icons';

import Logo from '@images/main-logo-transparent.png';
import style from './style.module.scss';

const Footer = () => {
    return (
        <footer className={style.footer}>
            <div className={style.container}>
                <section className={style.webInfo}>
                    <div className={style.webLogo}>
                        <img src={Logo} alt='Trang Chủ' />
                    </div>
                    <div className={style.webDes}>
                        <a href='/'>Peonyy~ Comics</a> - Đọc truyện online, đọc
                        truyện chữ, truyện tranh. Website luôn cập nhật những bộ
                        truyện mới nhất thuộc các thể loại đặc sắc như tiên
                        hiệp, truyện kiếm hiếp, hay truyện ngôn tình một cách
                        nhanh nhất. Hỗ trợ mọi thiết bị như di động và máy tính
                        bảng.
                    </div>
                    <div className={style.webCopyright}>
                        <div>
                            Copyright © 2025{' '}
                            <span style={{ color: '#f3aab5' }}>
                                Peonyy~ Comics
                            </span>
                        </div>
                    </div>
                </section>
                <section className={style.aboutMe}>
                    <h4>About me</h4>
                    <div className={style.aboutMeContainer}>
                        <span className={style.aboutMeItem}>
                            <div className={style.aboutMeIcon}>
                                <FacebookOutlined />
                            </div>
                            <div className={style.aboutMeTitle}>Facebook: </div>
                            <a href='https://www.facebook.com/Peonyy.5903/'>
                                Thiều Thắng
                            </a>
                        </span>
                        <span className={style.aboutMeItem}>
                            <div className={style.aboutMeIcon}>
                                <InstagramOutlined />
                            </div>
                            <div className={style.aboutMeTitle}>
                                Instagram:{' '}
                            </div>
                            <a href='https://www.instagram.com/pea.peonyy/'>
                                Thiều Thắng
                            </a>
                        </span>
                        <span className={style.aboutMeItem}>
                            <div className={style.aboutMeIcon}>
                                <GithubOutlined />
                            </div>
                            <div className={style.aboutMeTitle}>Github: </div>
                            <a href='https://github.com/ImPeonyy'>
                                Thiều Thắng
                            </a>
                        </span>
                    </div>
                </section>
                <section className={style.contactInfo}>
                    <h4>Liên hệ</h4>
                    <div className={style.contactInfoContainer}>
                        <span className={style.contactInfoItem}>
                            <span className={style.contactInfoTitle}>
                                Mail:{' '}
                            </span>
                            <span className={style.contactInfoContent}>
                                peony5903@gmail.com
                            </span>
                        </span>
                        <span className={style.contactInfoItem}>
                            <span className={style.contactInfoTitle}>
                                Phone:
                            </span>
                            <span className={style.contactInfoContent}>
                                0388464780
                            </span>
                        </span>
                        <span className={style.contactInfoItem}>
                            <span className={style.contactInfoTitle}>
                                Address:
                            </span>
                            <span className={style.contactInfoContent}>
                                170 An Dương Vương, TP. Quy Nhơn, Bình Định
                            </span>
                        </span>
                    </div>
                </section>
            </div>
        </footer>
    );
};

export default Footer;
