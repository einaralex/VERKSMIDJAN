"use client";

import { useState, useRef, ReactNode, useEffect } from "react";
import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar";
import { HeaderCollapsed, HeaderExpanded } from "@/components/Header";

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

const RowWrap = ({ children }: { children: ReactNode }) => {
  return <div className={styles.rowWrap}>{children}</div>;
};
export default function Home() {
  const [expandedRow, setExpandedRow] = useState<number>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isScrolling = useRef(false);
  const scrollThreshold = useRef(0);

  const rows = [
    {
      collapsedContent: <HeaderCollapsed />,
      expandedContent: <HeaderExpanded />,
    },
    {
      collapsedContent: <h2 className={styles.rowTitle}>Row 2</h2>,
      expandedContent: (
        <>
          <h2 className={styles.rowTitle}>Row 2</h2>
          <div className={styles.contentSection}>
            <p>Just this</p>
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
    {
      collapsedContent: <h2 className={styles.rowTitle}>Row 4</h2>,
      expandedContent: (
        <>
          <h2 className={styles.rowTitle}>Row 4</h2>
          <div className={styles.contentSection}>
            <p className={styles.rowText}>
              This is the content for row 4. It will expand when scrolled into
              view.
            </p>
            <p className={styles.rowText}>
              Additional content for row 4. This section should be scrollable.
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

      const SCROLL_THRESHOLD = 50;

      if (isScrolling.current) return;
      isScrolling.current = true;

      const currentContent = contentRefs.current[expandedRow];
      if (!currentContent) {
        isScrolling.current = false;
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = currentContent;
      const isAtBottom = scrollHeight - scrollTop <= clientHeight + 1;
      const isAtTop = scrollTop === 0;

      if (e.deltaY > 0) {
        // Scrolling down
        if (isAtBottom) {
          // Accumulate scroll threshold
          scrollThreshold.current += e.deltaY;

          // Only move down if we've scrolled enough
          if (scrollThreshold.current >= SCROLL_THRESHOLD) {
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
            // Reset threshold
            scrollThreshold.current = 0;
          }
        } else {
          // Reset threshold if we're not at the bottom
          scrollThreshold.current = 0;
          // Scroll current content
          currentContent.scrollTop += e.deltaY;
        }
      } else {
        // Scrolling up
        if (isAtTop && expandedRow > 0) {
          // Accumulate scroll threshold
          scrollThreshold.current += Math.abs(e.deltaY);

          // Only move up if we've scrolled enough
          if (scrollThreshold.current >= SCROLL_THRESHOLD) {
            // Move to previous row
            const prevRow = expandedRow - 1;
            setExpandedRow(prevRow);
            // Set scroll position of previous content to bottom
            const prevContent = contentRefs.current[prevRow];
            if (prevContent) {
              prevContent.scrollTop = prevContent.scrollHeight;
            }
            // Reset threshold
            scrollThreshold.current = 0;
          }
        } else {
          // Reset threshold if we're not at the top
          scrollThreshold.current = 0;
          // Scroll current content
          currentContent.scrollTop += e.deltaY;
        }
      }

      // Reset scrolling flag after a short delay
      setTimeout(() => {
        isScrolling.current = false;
      }, 50);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [expandedRow, rows.length]);

  return (
    <div className={styles.container}>
      {/* Slim Sidebar */}
      <Sidebar />

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
