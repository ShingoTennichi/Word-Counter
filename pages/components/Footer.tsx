import styles from "../../styles/Home.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Shingo Tennichi</p>
    </div>
  );
}
