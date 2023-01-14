import React, {useState, useEffect} from 'react';

import ClipboardButton from './ClipboardButton';
import styles from './Input.module.scss';
// @ts-ignore
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] });

// todo define types
export default function Input({
    urlPrefix = 'api.trickingapi.dev/',
    defaultValue = '',
    onSubmit = (value: string) => {},
}) {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    return (
        <form
            onSubmit={event => {
                event.preventDefault();
                onSubmit(value);
            }}
            className={styles.container}
        >
            <label htmlFor="url-input" className={`${styles.prefix} ${inter.className}`}>
                {urlPrefix}
            </label>
            <input
                id="url-input"
                className={`${styles.input} ${inter.className}`}
                type="text"
                value={value}
                onChange={event => setValue(event.target.value)}
            />
            <ClipboardButton text={`${urlPrefix}${value}`} />
            <button type="submit" className={styles.button}>
                Submit
            </button>
        </form>
    );
}