import styles from "styles/components/controls/LoadingDotsSpinner.module.css";

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
