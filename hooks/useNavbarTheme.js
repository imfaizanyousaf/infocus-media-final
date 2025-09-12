// hooks/useNavbarTheme.js
import { useEffect } from 'react';

// Utility function to dispatch navbar theme events
export const dispatchNavbarTheme = (theme, sectionId) => {
    const event = new CustomEvent('navbar-theme-change', {
        detail: { theme, sectionId },
    });
    window.dispatchEvent(event);
};

/**
 * Hook to set the theme of navbar based on section
 * @param {string} elementId - ID of the element to observe
 * @param {string} theme - Theme to dispatch ('light' or 'dark')
 * @param {Object} [options={}] - Additional options
 * @param {number} [options.threshold=0.3] - Intersection threshold
 * @param {string} [options.rootMargin='-100px 0px -50% 0px'] - Root margin for intersection
 * @param {boolean} [options.triggerOnMount=false] - Whether to trigger on mount
 */
export const useNavbarThemeById = (elementId, theme, options = {}) => {
    const {
        threshold = 0.3,
        rootMargin = '15% 0px -60% 0px',
        triggerOnMount = false
    } = options;

    useEffect(() => {
        const element = document.getElementById(elementId);
        if (!element) return;

        // Optionally trigger immediately on mount
        if (triggerOnMount) {
            dispatchNavbarTheme(theme, elementId);
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        dispatchNavbarTheme(theme, elementId);
                    }else {
                        dispatchNavbarTheme(theme ==="dark" ? "light" : "dark", elementId);
                    }
                });
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
            dispatchNavbarTheme(theme ==="dark" ? "light" : "dark", elementId);
        };
    }, [elementId, theme, threshold, rootMargin, triggerOnMount]);
};