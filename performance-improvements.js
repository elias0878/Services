// Performance Improvements for Cybersecurity Services Website

// Debounce function for search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Virtual scrolling for large datasets
class VirtualScroller {
    constructor(container, itemHeight, renderItem) {
        this.container = container;
        this.itemHeight = itemHeight;
        this.renderItem = renderItem;
        this.scrollTop = 0;
        this.containerHeight = container.clientHeight;
        this.totalItems = 0;
        this.visibleItems = Math.ceil(this.containerHeight / this.itemHeight) + 2;
        this.startIndex = 0;
        this.endIndex = this.visibleItems;
        
        this.setupScrollListener();
    }
    
    setupScrollListener() {
        this.container.addEventListener('scroll', debounce(() => {
            this.scrollTop = this.container.scrollTop;
            this.updateVisibleRange();
            this.render();
        }, 16)); // 60fps
    }
    
    updateVisibleRange() {
        this.startIndex = Math.floor(this.scrollTop / this.itemHeight);
        this.endIndex = Math.min(this.startIndex + this.visibleItems, this.totalItems);
    }
    
    render() {
        // Implementation would go here for virtual scrolling
        // This is a placeholder for the concept
    }
}

// Lazy loading for images
function setupLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Smooth animations with requestAnimationFrame
function smoothScroll(target, duration = 800) {
    const targetPosition = target.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Optimized search with caching
class SearchOptimizer {
    constructor() {
        this.cache = new Map();
        this.searchIndex = null;
        this.buildSearchIndex();
    }
    
    buildSearchIndex() {
        // Build a search index for faster searching
        this.searchIndex = services.map((service, index) => ({
            index,
            searchText: [
                service.name,
                service.description,
                service.category,
                service.subcategory
            ].join(' ').toLowerCase()
        }));
    }
    
    search(query) {
        if (this.cache.has(query)) {
            return this.cache.get(query);
        }
        
        const results = this.searchIndex.filter(item => 
            item.searchText.includes(query.toLowerCase())
        ).map(item => services[item.index]);
        
        this.cache.set(query, results);
        return results;
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            renderTime: [],
            searchTime: [],
            scrollTime: []
        };
    }
    
    startTimer(operation) {
        return performance.now();
    }
    
    endTimer(operation, startTime) {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        if (this.metrics[operation]) {
            this.metrics[operation].push(duration);
            
            // Keep only last 100 measurements
            if (this.metrics[operation].length > 100) {
                this.metrics[operation].shift();
            }
        }
        
        return duration;
    }
    
    getAverageTime(operation) {
        const times = this.metrics[operation];
        if (times.length === 0) return 0;
        return times.reduce((a, b) => a + b, 0) / times.length;
    }
}

// Memory management for large datasets
class MemoryManager {
    constructor(maxCacheSize = 1000) {
        this.cache = new Map();
        this.maxCacheSize = maxCacheSize;
        this.accessOrder = [];
    }
    
    set(key, value) {
        if (this.cache.has(key)) {
            this.updateAccessOrder(key);
        } else {
            if (this.cache.size >= this.maxCacheSize) {
                this.evictLeastRecentlyUsed();
            }
            this.cache.set(key, value);
            this.accessOrder.push(key);
        }
    }
    
    get(key) {
        if (this.cache.has(key)) {
            this.updateAccessOrder(key);
            return this.cache.get(key);
        }
        return null;
    }
    
    updateAccessOrder(key) {
        const index = this.accessOrder.indexOf(key);
        if (index > -1) {
            this.accessOrder.splice(index, 1);
            this.accessOrder.push(key);
        }
    }
    
    evictLeastRecentlyUsed() {
        const lruKey = this.accessOrder.shift();
        this.cache.delete(lruKey);
    }
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        VirtualScroller,
        setupLazyLoading,
        smoothScroll,
        SearchOptimizer,
        PerformanceMonitor,
        MemoryManager
    };
}

