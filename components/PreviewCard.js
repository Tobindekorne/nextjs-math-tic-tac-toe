import React from 'react';
import Link from 'next/link';
import styles from './PreviewCard.module.css';
import Image from 'next/image';

const PreviewCard = ({ image, route, title, desc }) => {
    return (
        <div className={`${styles.card}`}>
            <Link href={route}>
                <div className='shadow-lg '>
                    <Image className={'w-full'} src={image} alt={title} />
                    <div className={`px-6 py-4 ${styles.card__description}`}>
                        <div className='font-bold text-xl mb-2 card__title'>
                            {title}
                        </div>
                        <p className={`${styles.card__description_p}`}>
                            {desc}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default PreviewCard;
