import React from "react";
import clsx from "clsx";
import styles from "./loading.module.scss";

const Loading = () => {
    return (
        <div className={styles.spinner}>
            <div className={clsx(styles.loader, styles.l1)}></div>
            <div className={clsx(styles.loader, styles.l2)}></div>
        </div>
    );
};

export default Loading;
