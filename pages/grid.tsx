import { NextPage } from "next";
import styles from '../styles/grid.module.css';

const Grid: NextPage = () => {

    return(
        <div className={styles.container}>
            <div className={styles.item1}>
                <h1>item1</h1>
            </div>
            <div className={styles.item2}>
                <h1>item2</h1>
            </div>
            <div className={styles.item3}>
                <h1>item3</h1>
            </div>
            <div className={styles.item4}>
                <h1>item4</h1>
            </div>
            <div className={styles.item5}>
                <h1>item5</h1>
            </div>
            <div className={styles.item6}>
                <h1>item6</h1>
            </div>
            <div className={styles.item7}>
                <h1>item7</h1>
            </div>
            <div className={styles.item8}>
                <h1>item8</h1>
            </div>
            <div className={styles.item9}>
                <h1>item9</h1>
            </div>
            <div className={styles.item10}>
                <h1>item10</h1>
            </div>
            <div className={styles.nestedGrid}>
            <div className={styles.nested1}>
            </div>
            <div className={styles.nested2}>
            </div>
            </div>
        </div>
    )
}

export default Grid;