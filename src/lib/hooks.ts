import { useEffect, useRef, useState } from "react";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Eases a number towards `target` instead of snapping to it. Used for the
 * affordability figure and the result count.
 */
export function useAnimatedNumber(target: number, duration = 500): number {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }

    const from = fromRef.current;
    const delta = target - from;
    if (delta === 0) return;

    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // Matches --ease-entrance closely enough for a counter.
      const eased = 1 - Math.pow(1 - t, 3);
      const next = from + delta * eased;
      fromRef.current = next;
      setValue(next);
      if (t < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return value;
}

/**
 * Fade + rise on first scroll into view. Never re-animates on the way back up.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return;

    if (prefersReducedMotion()) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shown]);

  return { ref, shown };
}

/** Debounces a rapidly changing value — the affordability field as it is typed. */
export function useDebounced<T>(value: T, delay = 250): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

/** Traps Tab inside a container and calls `onClose` on Escape. For modals. */
export function useFocusTrap(
  active: boolean,
  onClose: () => void,
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;

    const node = ref.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusable = () =>
      Array.from(
        node?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null);

    focusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const items = focusable();
      if (items.length === 0) return;

      const first = items[0]!;
      const last = items[items.length - 1]!;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [active, onClose]);

  return ref;
}
