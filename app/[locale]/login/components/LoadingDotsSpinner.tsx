import styles from "./LoadingDotsSpinner.module.css";

const LoadingDotsSpinner = () => {
  return (
    <div className={styles.ldsEllipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingDotsSpinner;
