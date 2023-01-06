import React from 'react';
import style from './Footer.module.scss';

export default function Footer() {
    return (
        <footer className={style.footer}>
            <h4 className={style.footer__title}>Александр Зеленков, 2023</h4>
            <div className={style.footer__linksBlock}>
                <div className={style.footer__column}>
                    <a
                        href="mailto:lll555@yandex.ru"
                        target="blank"
                        className={style.footer__link}
                    >
                        lll555@yandex.ru
                    </a>
                    {' '}
                    <a
                        href="https://t.me/sasha_zelenkov"
                        target="blank"
                        className={style.footer__link}
                    >
                        Telegram
                    </a>
                </div>
                <div className={style.footer__column}>
                    <a
                        href="https://github.com/SashaZel/"
                        target="blank"
                        className={style.footer__link}
                    >
                        GitHub
                    </a>
                    {' '}
                    <a
                        href="https://www.zelenkov.space/"
                        target="blank"
                        className={style.footer__link}
                    >
                        www.zelenkov.space
                    </a>
                </div>
            </div>
        </footer>
    );
}
