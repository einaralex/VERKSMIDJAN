"use client";

import { useState, useRef, ReactNode, useEffect } from "react";
import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar";
import { HeaderCollapsed, HeaderExpanded } from "@/components/Header";
import {
  CollectiveCollapsed,
  CollectiveExpanded,
} from "@/components/Collective";
import { SocialCollapsed } from "@/components/Social";
import { SocialExpanded } from "@/components/Social";
import { MusicCollapsed, MusicExpanded } from "@/components/Music";

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
        <div
          ref={contentRef}
          className={styles.expandedContent}
          style={{ display: isExpanded ? "block" : "none" }}
        >
          {expandedContent}
        </div>
        <div style={{ display: isExpanded ? "none" : "block" }}>
          {collapsedContent}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [expandedRow, setExpandedRow] = useState<number>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isScrolling = useRef(false);
  const scrollThreshold = useRef(0);

  const ROWS = 4;
  // Update refs array when rows change
  contentRefs.current = contentRefs.current.slice(0, ROWS);

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
            const nextRow = Math.min(expandedRow + 1, ROWS - 1);
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
      }, SCROLL_THRESHOLD);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [expandedRow]);

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.main}>
        <div className={styles.rowsContainer}>
          <Row
            isExpanded={expandedRow === 0}
            onExpand={() => setExpandedRow(0)}
            expandedContent={<HeaderExpanded />}
            collapsedContent={<HeaderCollapsed />}
            contentRef={(el) => (contentRefs.current[0] = el)}
          />
          <Row
            isExpanded={expandedRow === 1}
            onExpand={() => setExpandedRow(1)}
            expandedContent={<CollectiveExpanded />}
            collapsedContent={<CollectiveCollapsed />}
            contentRef={(el) => (contentRefs.current[1] = el)}
          />
          <Row
            isExpanded={expandedRow === 2}
            onExpand={() => setExpandedRow(2)}
            expandedContent={<SocialExpanded />}
            collapsedContent={<SocialCollapsed />}
            contentRef={(el) => (contentRefs.current[2] = el)}
          />
          <Row
            isExpanded={expandedRow === 3}
            onExpand={() => setExpandedRow(3)}
            expandedContent={<MusicExpanded />}
            collapsedContent={<MusicCollapsed />}
            contentRef={(el) => (contentRefs.current[3] = el)}
          />
        </div>
      </main>
    </div>
  );
}
