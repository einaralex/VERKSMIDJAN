"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import styles from "./page.module.css";

interface RowProps {
  collapsedContent: ReactNode;
  expandedContent: ReactNode;
  isExpanded: boolean;
  onExpand: () => void;
  contentRef: (el: HTMLDivElement | null) => void;
}

const Row = ({
  collapsedContent,
  expandedContent,
  isExpanded,
  onExpand,
  contentRef,
}: RowProps) => {
  return (
    <div
      className={`${styles.row} ${
        isExpanded ? styles.rowExpanded : styles.rowCollapsed
      }`}
      onClick={onExpand}
    >
      <div className={styles.rowContent}>
        {isExpanded ? (
          <div ref={contentRef} className={styles.expandedContent}>
            {expandedContent}
          </div>
        ) : (
          collapsedContent
        )}
      </div>
    </div>
  );
};

export default function Home() {
  const [expandedRow, setExpandedRow] = useState<number>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const rows = [
    {
      collapsedContent: <h2 className={styles.rowTitle}>Row 1</h2>,
      expandedContent: (
        <>
          <h2 className={styles.rowTitle}>Row 1</h2>
          <div className={styles.contentSection}>
            <p className={styles.rowText}>
              This is the content for row 1. It will expand when scrolled into
              view.
            </p>
            <p className={styles.rowText}>
              Additional content for row 1. This section should be scrollable.
            </p>
            <p className={styles.rowText}>
              More content to demonstrate scrolling behavior.
            </p>
            <p className={styles.rowText}>
              Even more content to ensure scrolling is working.
            </p>
            <p className={styles.rowText}>
              Keep adding content to test the scroll behavior.
            </p>
            <p className={styles.rowText}>
              This should be enough content to make the container scrollable.
            </p>
          </div>
        </>
      ),
    },
    {
      collapsedContent: <h2 className={styles.rowTitle}>Row 2</h2>,
      expandedContent: (
        <>
          <h2 className={styles.rowTitle}>Row 2</h2>
          <div className={styles.contentSection}>
            <p className={styles.rowText}>
              This is the content for row 2. It will expand when scrolled into
              view.
            </p>
            <p className={styles.rowText}>
              Additional content for row 2. This section should be scrollable.
            </p>
            <p className={styles.rowText}>
              More content to demonstrate scrolling behavior.
            </p>
            <p className={styles.rowText}>
              Even more content to ensure scrolling is working.
            </p>
            <p className={styles.rowText}>
              Keep adding content to test the scroll behavior.
            </p>
            <p className={styles.rowText}>
              This should be enough content to make the container scrollable.
            </p>
          </div>
        </>
      ),
    },
    {
      collapsedContent: <h2 className={styles.rowTitle}>Row 3</h2>,
      expandedContent: (
        <>
          <h2 className={styles.rowTitle}>Row 3</h2>
          <div className={styles.contentSection}>
            <p className={styles.rowText}>
              This is the content for row 3. It will expand when scrolled into
              view.
            </p>
            <p className={styles.rowText}>
              Additional content for row 3. This section should be scrollable.
            </p>
            <p className={styles.rowText}>
              More content to demonstrate scrolling behavior.
            </p>
            <p className={styles.rowText}>
              Even more content to ensure scrolling is working.
            </p>
            <p className={styles.rowText}>
              Keep adding content to test the scroll behavior.
            </p>
            <p className={styles.rowText}>
              This should be enough content to make the container scrollable.
            </p>
          </div>
        </>
      ),
    },
  ];

  // Update refs array when rows change
  useEffect(() => {
    contentRefs.current = contentRefs.current.slice(0, rows.length);
  }, [rows.length]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const currentContent = contentRefs.current[expandedRow];
      if (!currentContent) return;

      const { scrollTop, scrollHeight, clientHeight } = currentContent;
      const isAtBottom = scrollHeight - scrollTop <= clientHeight + 1;
      const isAtTop = scrollTop === 0;

      if (e.deltaY > 0) {
        // Scrolling down
        if (isAtBottom) {
          // Move to next row
          const nextRow = Math.min(expandedRow + 1, rows.length - 1);
          if (nextRow !== expandedRow) {
            setExpandedRow(nextRow);
            // Reset scroll position of new content
            const nextContent = contentRefs.current[nextRow];
            if (nextContent) {
              nextContent.scrollTop = 0;
            }
          }
        } else {
          // Scroll current content
          currentContent.scrollTop += e.deltaY;
        }
      } else {
        // Scrolling up
        if (isAtTop) {
          // Move to previous row
          const prevRow = Math.max(expandedRow - 1, 0);
          if (prevRow !== expandedRow) {
            setExpandedRow(prevRow);
            // Set scroll position of previous content to bottom
            const prevContent = contentRefs.current[prevRow];
            if (prevContent) {
              prevContent.scrollTop = prevContent.scrollHeight;
            }
          }
        } else {
          // Scroll current content
          currentContent.scrollTop += e.deltaY;
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [expandedRow, rows.length]);

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
              collapsedContent={row.collapsedContent}
              expandedContent={row.expandedContent}
              isExpanded={expandedRow === index}
              onExpand={() => setExpandedRow(index)}
              contentRef={(el) => (contentRefs.current[index] = el)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
