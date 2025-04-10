"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";

interface RowProps {
  title: string;
  content: string;
  isExpanded: boolean;
  onExpand: () => void;
}

const Row = ({ title, content, isExpanded, onExpand }: RowProps) => {
  return (
    <div
      className={`${styles.row} ${
        isExpanded ? styles.rowExpanded : styles.rowCollapsed
      }`}
      onClick={onExpand}
    >
      <div className={styles.rowContent}>
        <h2 className={styles.rowTitle}>{title}</h2>
        {isExpanded && <p className={styles.rowText}>{content}</p>}
      </div>
    </div>
  );
};

export default function Home() {
  const [expandedRow, setExpandedRow] = useState<number>(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      const SCROLL_DELAY = 50;

      scrollTimeout.current = setTimeout(() => {
        const direction = Math.sign(e.deltaY);
        const newExpandedRow = Math.max(
          0,
          Math.min(rows.length - 1, expandedRow + direction)
        );

        if (newExpandedRow !== expandedRow) {
          setExpandedRow(newExpandedRow);
        }
      }, SCROLL_DELAY);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [expandedRow]);

  const rows = [
    {
      title: "Row 1",
      content:
        "This is the content for row 1. It will expand when scrolled into view.",
    },
    {
      title: "Row 2",
      content:
        "This is the content for row 2. It will expand when scrolled into view.",
    },
    {
      title: "Row 3",
      content:
        "This is the content for row 3. It will expand when scrolled into view.",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Slim Sidebar */}
      <div className={styles.sidebar}>
        <h1 className={styles.sidebarTitle}>Sidebar</h1>
        <nav>
          <ul className={styles.sidebarNav}>
            <li className={styles.sidebarNavItem}>Link 1</li>
            <li className={styles.sidebarNavItem}>Link 2</li>
            <li className={styles.sidebarNavItem}>Link 3</li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.rowsContainer}>
          {rows.map((row, index) => (
            <Row
              key={index}
              title={row.title}
              content={row.content}
              isExpanded={expandedRow === index}
              onExpand={() => setExpandedRow(index)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
