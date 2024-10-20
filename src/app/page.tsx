import { AppFrame } from "~/components/frame";

import styles from "./page.module.css";

export default function Home() {
  return (
    <AppFrame>
      <div className={styles.page}>
        hello
      </div>
    </AppFrame>
  );
}
