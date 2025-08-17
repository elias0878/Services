// Smooth Navigation Enhancement Script for Services Page
// تحسين التنقل السلس لصفحة الخدمات

(function() {
    'use strict';
    
    // Page transition effects
    const PageTransition = {
        // تأثير الانتقال عند مغادرة الصفحة
        fadeOut: function(callback) {
            document.body.style.transition = 'opacity 0.3s ease-out';
            document.body.style.opacity = '0';
            setTimeout(callback, 300);
        },
        
        // تأثير الانتقال عند دخول الصفحة
        fadeIn: function() {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease-in';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        },
        
        // تأثير التحميل
        showLoader: function() {
            const loader = document.createElement('div');
            loader.id = 'page-loader';
            loader.innerHTML = `
                <div class="loader-content">
                    <div class="loader-spinner"></div>
                    <div class="loader-text">جاري التحميل...</div>
                </div>
            `;
            loader.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(44, 62, 80, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                backdrop-filter: blur(5px);
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                .loader-content {
                    text-align: center;
                    color: white;
                }
                .loader-spinner {
                    width: 50px;
                    height: 50px;
                    border: 3px solid rgba(255,255,255,0.3);
                    border-top: 3px solid #3498db;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 20px;
                }
                .loader-text {
                    font-size: 1.2em;
                    font-family: 'Tajawal', sans-serif;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(loader);
            
            return loader;
        },
        
        // إخفاء التحميل
        hideLoader: function() {
            const loader = document.getElementById('page-loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 300);
            }
        }
    };
    
    // Enhanced link handling for smooth navigation
    const SmoothNavigation = {
        init: function() {
            this.setupLinkHandlers();
            this.setupPageLoad();
            this.setupBackButton();
            this.setupServiceCardAnimations();
        },
        
        setupLinkHandlers: function() {
            document.addEventListener('click', (e) => {
                const link = e.target.closest('a');
                if (!link) return;
                
                const href = link.getAttribute('href');
                
                // تحقق من الروابط الداخلية
                if (this.isInternalLink(href)) {
                    e.preventDefault();
                    this.navigateToPage(href);
                }
            });
        },
        
        setupPageLoad: function() {
            // تأثير دخول الصفحة
            window.addEventListener('load', () => {
                PageTransition.fadeIn();
                this.animateElements();
            });
            
            // تأثير إعادة تحميل الصفحة
            window.addEventListener('beforeunload', () => {
                PageTransition.fadeOut(() => {});
            });
        },
        
        setupBackButton: function() {
            window.addEventListener('popstate', (e) => {
                if (e.state && e.state.page) {
                    this.navigateToPage(e.state.page, false);
                }
            });
        },
        
        setupServiceCardAnimations: function() {
            // تحسين تأثيرات بطاقات الخدمات
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0) scale(1)';
                        }, index * 100);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            // مراقبة بطاقات الخدمات
            document.querySelectorAll('.service-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px) scale(0.95)';
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                observer.observe(card);
            });
        },
        
        isInternalLink: function(href) {
            if (!href) return false;
            
            // روابط نسبية أو روابط تحتوي على نطاق الموقع
            return href.startsWith('/') || 
                   href.startsWith('./') || 
                   href.startsWith('../') ||
                   href.includes('elias0878.github.io');
        },
        
        navigateToPage: function(url, addToHistory = true) {
            const loader = PageTransition.showLoader();
            
            PageTransition.fadeOut(() => {
                if (addToHistory) {
                    history.pushState({page: url}, '', url);
                }
                
                // محاكاة تأخير التحميل للتأثير البصري
                setTimeout(() => {
                    window.location.href = url;
                }, 500);
            });
        },
        
        animateElements: function() {
            // تحريك العناصر عند تحميل الصفحة
            const elements = document.querySelectorAll('.search-section, .results-section, .hero-stats .stat-item');
            
            elements.forEach((element, index) => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }
    };
    
    // Enhanced service card interactions
    const ServiceCardEnhancements = {
        init: function() {
            this.setupHoverEffects();
            this.setupClickEffects();
            this.setupFilterAnimations();
        },
        
        setupHoverEffects: function() {
            document.addEventListener('mouseover', (e) => {
                const card = e.target.closest('.service-card');
                if (card) {
                    this.addHoverEffect(card);
                }
            });
            
            document.addEventListener('mouseout', (e) => {
                const card = e.target.closest('.service-card');
                if (card) {
                    this.removeHoverEffect(card);
                }
            });
        },
        
        setupClickEffects: function() {
            document.addEventListener('click', (e) => {
                const card = e.target.closest('.service-card');
                if (card) {
                    this.addClickEffect(card);
                }
            });
        },
        
        setupFilterAnimations: function() {
            // تحسين تأثيرات الفلترة
            const originalRenderServices = window.renderServices;
            if (originalRenderServices) {
                window.renderServices = function() {
                    const container = document.getElementById('servicesGrid');
                    
                    // إخفاء البطاقات الحالية
                    const currentCards = container.querySelectorAll('.service-card');
                    currentCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(-20px) scale(0.95)';
                        }, index * 20);
                    });
                    
                    // تأخير عرض البطاقات الجديدة
                    setTimeout(() => {
                        originalRenderServices.call(this);
                    }, currentCards.length * 20 + 200);
                };
            }
        },
        
        addHoverEffect: function(element) {
            element.style.transform = 'translateY(-12px) scale(1.02)';
            element.style.boxShadow = '0 20px 40px rgba(52, 152, 219, 0.15)';
            element.style.borderColor = 'rgba(52, 152, 219, 0.3)';
        },
        
        removeHoverEffect: function(element) {
            element.style.transform = 'translateY(-8px) scale(1)';
            element.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
            element.style.borderColor = 'rgba(52, 152, 219, 0.1)';
        },
        
        addClickEffect: function(element) {
            element.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                element.style.transform = 'translateY(-12px) scale(1.02)';
            }, 150);
        }
    };
    
    // Cross-page communication for better UX
    const CrossPageSync = {
        init: function() {
            this.syncUserPreferences();
            this.setupPageMemory();
            this.setupSearchMemory();
        },
        
        syncUserPreferences: function() {
            // مزامنة تفضيلات المستخدم بين الصفحات
            const preferences = localStorage.getItem('userPreferences');
            if (preferences) {
                const prefs = JSON.parse(preferences);
                this.applyPreferences(prefs);
            }
        },
        
        applyPreferences: function(prefs) {
            // تطبيق التفضيلات المحفوظة
            if (prefs.theme) {
                document.body.setAttribute('data-theme', prefs.theme);
            }
            if (prefs.lastSearch) {
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.value = prefs.lastSearch;
                }
            }
        },
        
        setupPageMemory: function() {
            // حفظ حالة الصفحة للعودة إليها
            window.addEventListener('beforeunload', () => {
                const pageState = {
                    scrollPosition: window.pageYOffset,
                    timestamp: Date.now(),
                    searchTerm: document.getElementById('searchInput')?.value || '',
                    currentCategory: window.currentCategory || 'all',
                    currentSubcategory: window.currentSubcategory || 'all'
                };
                sessionStorage.setItem('servicesPageState', JSON.stringify(pageState));
            });
            
            // استعادة حالة الصفحة
            window.addEventListener('load', () => {
                const pageState = sessionStorage.getItem('servicesPageState');
                if (pageState) {
                    const state = JSON.parse(pageState);
                    // استعادة موضع التمرير إذا كان حديثاً
                    if (Date.now() - state.timestamp < 10000) {
                        setTimeout(() => {
                            window.scrollTo(0, state.scrollPosition);
                            
                            // استعادة البحث والفلاتر
                            if (state.searchTerm) {
                                const searchInput = document.getElementById('searchInput');
                                if (searchInput) {
                                    searchInput.value = state.searchTerm;
                                }
                            }
                        }, 500);
                    }
                }
            });
        },
        
        setupSearchMemory: function() {
            // حفظ آخر بحث للمستخدم
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.addEventListener('input', debounce((e) => {
                    const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
                    preferences.lastSearch = e.target.value;
                    localStorage.setItem('userPreferences', JSON.stringify(preferences));
                }, 1000));
            }
        }
    };
    
    // Initialize all modules when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        SmoothNavigation.init();
        ServiceCardEnhancements.init();
        CrossPageSync.init();
    });
    
    // Export for external use
    window.SmoothNavigation = SmoothNavigation;
    window.PageTransition = PageTransition;
    window.ServiceCardEnhancements = ServiceCardEnhancements;
    
})();

