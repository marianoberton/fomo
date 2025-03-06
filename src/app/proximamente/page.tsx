"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

export default function ComingSoon() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.get('from')) {
      router.replace('/proximamente?from=root');
    }
  }, [router]);

  return (
    <main className={styles.container}>
      <div className={styles.gradient}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>FoMo</h1>
        <p className={styles.subtitle}>Próximamente</p>
      </div>
    </main>
  );
}