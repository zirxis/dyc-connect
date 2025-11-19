// DYS-CONNECT Main JavaScript File
// Handles all interactive functionality across the platform

// Global variables
let currentRole = null;
let currentLanguage = 'ar';
let dashboardData = {};

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    // Initialize typewriter effect for hero text
    initTypewriter();
    
    // Initialize animations
    initAnimations();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize mobile menu (if present)
    initMobileMenu();
    
    // Initialize dashboard functionality
    initDashboard();
    
    // Initialize activity feed animations
    initActivityFeed();
    
    // Initialize responsive features
    initResponsiveFeatures();
}

// Typewriter effect initialization
function initTypewriter() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        const typed = new Typed('#typed-text', {
            strings: [
                'DYS-CONNECT',
                'دعم متكامل',
                'تعلم ذكي',
                'مستقبل أفضل'
            ],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Initialize animations using Anime.js
function initAnimations() {
    // Skip heavy animations on small screens to improve performance
    if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) {
        return;
    }

    // Animate floating elements
    anime({
        targets: '.floating-element',
        translateY: [-20, 20],
        duration: 4000,
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true
    });
    
    // Animate role cards on scroll
    const roleCards = document.querySelectorAll('.role-card');
    if (roleCards.length > 0) {
        anime({
            targets: roleCards,
            translateY: [50, 0],
            opacity: [0, 1],
            delay: anime.stagger(200),
            duration: 800,
            easing: 'easeOutExpo'
        });
    }
}

// Navigation functionality
function initNavigation() {
    // Handle navigation clicks
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
    
    // Handle language switching
    initLanguageSwitching();
}

// Language switching functionality
function initLanguageSwitching() {
    const languageButtons = document.querySelectorAll('[data-lang]');
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const newLang = this.getAttribute('data-lang');
            switchLanguage(newLang);
        });
    });
}

// Switch application language
function switchLanguage(language) {
    currentLanguage = language;
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // Update text content based on language
    updateLanguageContent(language);
}

// Update content based on selected language
function updateLanguageContent(language) {
    const translations = {
        ar: {
            dashboardTitle: 'لوحة التحكم',
            dashboardSubtitle: 'مرحباً بك في منصة DYS-CONNECT',
            heroTitle: 'DYS-CONNECT',
            heroSubtitle: 'منصة متكاملة لربط الأمهات، الأطفال، المعلمين، والمختصين'
        },
        fr: {
            dashboardTitle: 'Tableau de Bord',
            dashboardSubtitle: 'Bienvenue sur DYS-CONNECT',
            heroTitle: 'DYS-CONNECT',
            heroSubtitle: 'Plateforme intégrée pour connecter mères, enfants, enseignants et spécialistes'
        },
        en: {
            dashboardTitle: 'Dashboard',
            dashboardSubtitle: 'Welcome to DYS-CONNECT',
            heroTitle: 'DYS-CONNECT',
            heroSubtitle: 'Integrated platform connecting mothers, children, teachers, and specialists'
        }
    };
    
    const content = translations[language] || translations.ar;
    
    // Update dashboard elements
    const dashboardTitle = document.getElementById('dashboard-title');
    const dashboardSubtitle = document.getElementById('dashboard-subtitle');
    
    if (dashboardTitle) dashboardTitle.textContent = content.dashboardTitle;
    if (dashboardSubtitle) dashboardSubtitle.textContent = content.dashboardSubtitle;
}

// Role selection functionality
function selectRole(role) {
    currentRole = role;
    
    // Hide role selection section
    const roleSection = document.querySelector('section:nth-child(3)');
    if (roleSection) {
        anime({
            targets: roleSection,
            opacity: 0,
            translateY: -50,
            duration: 500,
            easing: 'easeInExpo',
            complete: function() {
                roleSection.style.display = 'none';
                showDashboard(role);
            }
        });
    }
}

// Show dashboard based on selected role
function showDashboard(role) {
    const dashboardContent = document.getElementById('dashboard-content');
    const dashboardGrid = document.getElementById('dashboard-grid');
    const dashboardTitle = document.getElementById('dashboard-title');
    const dashboardSubtitle = document.getElementById('dashboard-subtitle');
    
    if (!dashboardContent || !dashboardGrid) return;
    
    // Show dashboard section
    dashboardContent.classList.remove('hidden');
    
    // Update dashboard title based on role
    const roleTitles = {
        mother: 'لوحة تحكم الأم',
        teacher: 'لوحة تحكم المعلم',
        specialist: 'لوحة تحكم المختص',
        institution: 'لوحة تحكم المؤسسة',
        researcher: 'لوحة تحكم الباحث'
    };
    
    if (dashboardTitle) {
        dashboardTitle.textContent = roleTitles[role] || 'لوحة التحكم';
    }
    
    // Generate dashboard content based on role
    generateDashboardContent(role, dashboardGrid);
    
    // Animate dashboard appearance
    anime({
        targets: dashboardContent,
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 800,
        easing: 'easeOutExpo'
    });
}

// Generate dashboard content based on role
function generateDashboardContent(role, container) {
    const content = getRoleSpecificContent(role);
    container.innerHTML = content;
    
    // Initialize dashboard-specific features
    initDashboardFeatures(role);
}

// Get role-specific dashboard content
function getRoleSpecificContent(role) {
    const contentTemplates = {
        mother: `
            <div class="bg-white rounded-2xl shadow-lg p-6 card-hover">
                <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-semibold text-dys-blue">تقدم أطفالي</h4>
                    <div class="w-12 h-12 bg-dys-cyan/10 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-dys-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                    </div>
                </div>
                <div id="children-progress-chart" class="h-48"></div>
            </div>
            
            <div class="bg-white rounded-2xl shadow-lg p-6 card-hover">
                <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-semibold text-dys-blue">الأدوات الذكية</h4>
                    <div class="w-12 h-12 bg-dys-orange/10 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-dys-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                </div>
                <div class="space-y-3">
                    <button onclick="window.location.href='smart-tools.html'" class="w-full text-right p-3 bg-dys-light-gray rounded-xl hover:bg-dys-orange/10 transition-colors">
                        <div class="font-semibold text-dys-blue">ملخص الدروس</div>
                        <div class="text-sm text-dys-gray">حوّل المواد المعقدة إلى ملاحظات مبسطة</div>
                    </button>
                    <button onclick="window.location.href='smart-tools.html'" class="w-full text-right p-3 bg-dys-light-gray rounded-xl hover:bg-dys-orange/10 transition-colors">
                        <div class="font-semibold text-dys-blue">خريطة ذهنية</div>
                        <div class="text-sm text-dys-gray">أنشئ خرائط ذهنية تفاعلية</div>
                    </button>
                </div>
            </div>
            
            <div class="bg-white rounded-2xl shadow-lg p-6 card-hover">
                <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-semibold text-dys-blue">الجلسات القادمة</h4>
                    <div class="w-12 h-12 bg-dys-green/10 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-dys-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                </div>
                <div class="space-y-3">
                    <div class="p-3 border-l-4 border-dys-cyan bg-dys-light-gray rounded-r-xl">
                        <div class="font-semibold text-dys-blue">جلسة تقييم</div>
                        <div class="text-sm text-dys-gray">الدكتورة فاطمة - غداً الساعة 10:00</div>
                    </div>
                    <div class="p-3 border-l-4 border-dys-orange bg-dys-light-gray rounded-r-xl">
                        <div class="font-semibold text-dys-blue">متابعة تقدم</div>
                        <div class="text-sm text-dys-gray">المعلمة سارة - بعد غداً الساعة 14:00</div>
                    </div>
                </div>
            </div>
        `,
        
        teacher: `
            <div class="bg-white rounded-2xl shadow-lg p-6 card-hover">
                <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-semibold text-dys-blue">الحالات المعلقة</h4>
                    <div class="w-12 h-12 bg-dys-orange/10 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-dys-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                        </svg>
                    </div>
                </div>
                <div class="space-y-3">
                    <div class="p-3 bg-dys-orange/10 rounded-xl">
                        <div class="flex justify-between items-center">
                            <div>
                                <div class="font-semibold text-dys-blue">أحمد محمد</div>
                                <div class="text-sm text-dys-gray">صعوبة في القراءة</div>
                            </div>
                            <button onclick="window.location.href='questionnaire.html'" class="bg-dys-orange text-white px-4 py-2 rounded-lg text-sm">
                                تقييم
                            </button>
                        </div>
                    </div>
                    <div class="p-3 bg-dys-orange/10 rounded-xl">
                        <div class="flex justify-between items-center">
                            <div>
                                <div class="font-semibold text-dys-blue">سارة أحمد</div>
                                <div class="text-sm text-dys-gray">مشكلة تركيز</div>
                            </div>
                            <button onclick="window.location.href='questionnaire.html'" class="bg-dys-orange text-white px-4 py-2 rounded-lg text-sm">
                                تقييم
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-2xl shadow-lg p-6 card-hover">
                <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-semibold text-dys-blue">الطلاب النشطين</h4>
                    <div class="w-12 h-12 bg-dys-cyan/10 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-dys-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                        </svg>
                    </div>
                </div>
                <div id="students-progress-chart" class="h-48"></div>
            </div>
            
            <div class="bg-white rounded-2xl shadow-lg p-6 card-hover">
                <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-semibold text-dys-blue">أدوات التقييم</h4>
                    <div class="w-12 h-12 bg-dys-green/10 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-dys-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                        </svg>
                    </div>
                </div>
                <div class="space-y-3">
                    <button onclick="window.location.href='questionnaire.html'" class="w-full text-right p-3 bg-dys-light-gray rounded-xl hover:bg-dys-green/10 transition-colors">
                        <div class="font-semibold text-dys-blue">استبيان الكشف المبكر</div>
                        <div class="text-sm text-dys-gray">قيم الطلاب في 6 مجالات أساسية</div>
                    </button>
                    <button class="w-full text-right p-3 bg-dys-light-gray rounded-xl hover:bg-dys-green/10 transition-colors">
                        <div class="font-semibold text-dys-blue">تقارير التقدم</div>
                        <div class="text-sm text-dys-gray">راجع تقارير تقدم الطلاب</div>
                    </button>
                </div>
            </div>
        `,
        
        specialist: `
            <div class="bg-white rounded-2xl shadow-lg p-6 card-hover">
                <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-semibold text-dys-blue">الإحالات الجديدة</h4>
                    <div class="w-12 h-12 bg-dys-cyan/10 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-dys-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                        </svg>
                    </div>
                </div>
                <div class="space-y-3">
                    <div class="p-3 bg-dys-cyan/10 rounded-xl">
                        <div class="flex justify-between items-center">
                            <div>
                                <div class="font-semibold text-dys-blue">أحمد محمد</div>
                                <div class="text-sm text-dys-gray">إحالة من المعلمة سارة</div>
                                <div class="text-xs text-dys-gray">صعوبة قراءة متوسطة</div>
                            </div>
                            <button class="bg-dys-cyan text-white px-4 py-2 rounded-lg text-sm">
                                مراجعة
                            </button>
                        </div>
                    </div>
                    <div class="p-3 bg-dys-cyan/10 rounded-xl">
                        <div class="flex justify-between items-center">
                            <div>
                                <div class="font-semibold text-dys-blue">سارة أحمد</div>
                                <div class="text-sm text-dys-gray">إحالة من المعلم خالد</div>
                                <div class="text-xs text-dys-gray">مشكلة تركيز عالية</div>
                            </div>
                            <button class="bg-dys-cyan text-white px-4 py-2 rounded-lg text-sm">
                                مراجعة
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-2xl shadow-lg p-6 card-hover">
                <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-semibold text-dys-blue">جلسات اليوم</h4>
                    <div class="w-12 h-12 bg-dys-orange/10 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-dys-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                </div>
                <div class="space-y-3">
                    <div class="p-3 border-l-4 border-dys-orange bg-dys-light-gray rounded-r-xl">
                        <div class="font-semibold text-dys-blue">جلسة تقييم أولي</div>
                        <div class="text-sm text-dys-gray">أحمد محمد - الساعة 10:00</div>
                        <div class="text-xs text-dys-gray">مقر العيادة</div>
                    </div>
                    <div class="p-3 border-l-4 border-dys-green bg-dys-light-gray rounded-r-xl">
                        <div class="font-semibold text-dys-blue">جلسة متابعة</div>
                        <div class="text-sm text-dys-gray">فاطمة علي - الساعة 14:00</div>
                        <div class="text-xs text-dys-gray">عن بعد</div>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-2xl shadow-lg p-6 card-hover">
                <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-semibold text-dys-blue">التقارير المهنية</h4>
                    <div class="w-12 h-12 bg-dys-green/10 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-dys-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                    </div>
                </div>
                <div class="space-y-3">
                    <button class="w-full text-right p-3 bg-dys-light-gray rounded-xl hover:bg-dys-green/10 transition-colors">
                        <div class="font-semibold text-dys-blue">تقرير شهري</div>
                        <div class="text-sm text-dys-gray">تقرير تقدم الحالات لشهر نوفمبر</div>
                    </button>
                    <button class="w-full text-right p-3 bg-dys-light-gray rounded-xl hover:bg-dys-green/10 transition-colors">
                        <div class="font-semibold text-dys-blue">خطة علاجية</div>
                        <div class="text-sm text-dys-gray">تحديث خطة العلاج لأحمد محمد</div>
                    </button>
                </div>
            </div>
        `,
        
        institution: `
            <div class="bg-white rounded-2xl shadow-lg p-6 card-hover">
                <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-semibold text-dys-blue">فريق العمل</h4>
                    <div class="w-12 h-12 bg-dys-blue/10 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-dys-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="text-center p-3 bg-dys-light-gray rounded-xl">
                        <div class="text-2xl font-bold text-dys-cyan">12</div>
                        <div class="text-sm text-dys-gray">معلم</div>
                    </div>
                    <div class="text-center p-3 bg-dys-light-gray rounded-xl">
                        <div class="text-2xl font-bold text-dys-orange">5</div>
                        <div class="text-sm text-dys-gray">مختص</div>
                    </div>
                </div>
                <button class="w-full bg-dys-blue text-white py-2 rounded-xl">
                    إدارة الفريق
                </button>
            </div>
            
            <div class="bg-white rounded-2xl shadow-lg p-6 card-hover">
                <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-semibold text-dys-blue">الإحصائيات الشهرية</h4>
                    <div class="w-12 h-12 bg-dys-cyan/10 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-dys-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                    </div>
                </div>
                <div id="institution-stats-chart" class="h-48"></div>
            </div>
            
            <div class="bg-white rounded-2xl shadow-lg p-6 card-hover">
                <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-semibold text-dys-blue">التقارير والتحليلات</h4>
                    <div class="w-12 h-12 bg-dys-green/10 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-dys-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                    </div>
                </div>
                <div class="space-y-3">
                    <button class="w-full text-right p-3 bg-dys-light-gray rounded-xl hover:bg-dys-green/10 transition-colors">
                        <div class="font-semibold text-dys-blue">تقرير الأداء</div>
                        <div class="text-sm text-dys-gray">تحليل شامل لأداء المنصة</div>
                    </button>
                    <button class="w-full text-right p-3 bg-dys-light-gray rounded-xl hover:bg-dys-green/10 transition-colors">
                        <div class="font-semibold text-dys-blue">تقرير الحالات</div>
                        <div class="text-sm text-dys-gray">إحصائيات الحالات المعالجة</div>
                    </button>
                </div>
            </div>
        `,
        
        researcher: `
            <div class="bg-white rounded-2xl shadow-lg p-6 card-hover">
                <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-semibold text-dys-blue">طلبات البحث</h4>
                    <div class="w-12 h-12 bg-dys-cyan/10 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-dys-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                        </svg>
                    </div>
                </div>
                <div class="space-y-3">
                    <div class="p-3 bg-dys-cyan/10 rounded-xl">
                        <div class="flex justify-between items-center">
                            <div>
                                <div class="font-semibold text-dys-blue">دراسة فعالية التدخل</div>
                                <div class="text-sm text-dys-gray">بانتظار موافقة الأخلاقيات</div>
                            </div>
                            <span class="bg-dys-orange text-white px-2 py-1 rounded text-xs">قيد المراجعة</span>
                        </div>
                    </div>
                    <div class="p-3 bg-dys-green/10 rounded-xl">
                        <div class="flex justify-between items-center">
                            <div>
                                <div class="font-semibold text-dys-blue">تحليل أنماط التعلم</div>
                                <div class="text-sm text-dys-gray">تمت الموافقة</div>
                            </div>
                            <span class="bg-dys-green text-white px-2 py-1 rounded text-xs">مقبول</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-2xl shadow-lg p-6 card-hover">
                <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-semibold text-dys-blue">قاعدة البيانات</h4>
                    <div class="w-12 h-12 bg-dys-orange/10 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-dys-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                        </svg>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="text-center p-3 bg-dys-light-gray rounded-xl">
                        <div class="text-2xl font-bold text-dys-cyan">1,247</div>
                        <div class="text-sm text-dys-gray">حالة مسجلة</div>
                    </div>
                    <div class="text-center p-3 bg-dys-light-gray rounded-xl">
                        <div class="text-2xl font-bold text-dys-orange">89</div>
                        <div class="text-sm text-dys-gray">متغير قابل للتحليل</div>
                    </div>
                </div>
                <button class="w-full bg-dys-orange text-white py-2 rounded-xl">
                    الوصول إلى البيانات
                </button>
            </div>
            
            <div class="bg-white rounded-2xl shadow-lg p-6 card-hover">
                <div class="flex items-center justify-between mb-4">
                    <h4 class="text-lg font-semibold text-dys-blue">التعاون البحثي</h4>
                    <div class="w-12 h-12 bg-dys-green/10 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-dys-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                    </div>
                </div>
                <div class="space-y-3">
                    <button class="w-full text-right p-3 bg-dys-light-gray rounded-xl hover:bg-dys-green/10 transition-colors">
                        <div class="font-semibold text-dys-blue">فرق البحث</div>
                        <div class="text-sm text-dys-gray">تعاون مع باحثين آخرين</div>
                    </button>
                    <button class="w-full text-right p-3 bg-dys-light-gray rounded-xl hover:bg-dys-green/10 transition-colors">
                        <div class="font-semibold text-dys-blue">نشر النتائج</div>
                        <div class="text-sm text-dys-gray">شارك نتائج أبحاثك</div>
                    </button>
                </div>
            </div>
        `
    };
    
    return contentTemplates[role] || contentTemplates.mother;
}

// Initialize dashboard features based on role
function initDashboardFeatures(role) {
    // Initialize charts based on role
    switch(role) {
        case 'mother':
            initChildrenProgressChart();
            break;
        case 'teacher':
            initStudentsProgressChart();
            break;
        case 'institution':
            initInstitutionStatsChart();
            break;
    }
}

// Initialize children progress chart (for mother role)
function initChildrenProgressChart() {
    const chartElement = document.getElementById('children-progress-chart');
    if (!chartElement) return;
    
    const chart = echarts.init(chartElement);
    
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['أحمد', 'سارة'],
            bottom: 0
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['قراءة', 'كتابة', 'رياضيات', 'تركيز', 'ذاكرة', 'سلوك']
        },
        yAxis: {
            type: 'value',
            max: 100
        },
        series: [
            {
                name: 'أحمد',
                type: 'line',
                data: [65, 72, 58, 45, 68, 75],
                smooth: true,
                lineStyle: {
                    color: '#00AEEF'
                },
                itemStyle: {
                    color: '#00AEEF'
                }
            },
            {
                name: 'سارة',
                type: 'line',
                data: [78, 85, 70, 60, 75, 80],
                smooth: true,
                lineStyle: {
                    color: '#8BC643'
                },
                itemStyle: {
                    color: '#8BC643'
                }
            }
        ]
    };
    
    chart.setOption(option);
}

// Initialize students progress chart (for teacher role)
function initStudentsProgressChart() {
    const chartElement = document.getElementById('students-progress-chart');
    if (!chartElement) return;
    
    const chart = echarts.init(chartElement);
    
    const option = {
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: 'توزيع الطلاب',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 15, name: 'ممتاز', itemStyle: { color: '#8BC643' } },
                    { value: 8, name: 'جيد', itemStyle: { color: '#00AEEF' } },
                    { value: 5, name: 'يحتاج دعم', itemStyle: { color: '#F39200' } },
                    { value: 2, name: 'يحتاج تدخل', itemStyle: { color: '#EF4444' } }
                ]
            }
        ]
    };
    
    chart.setOption(option);
}

// Initialize institution stats chart (for institution role)
function initInstitutionStatsChart() {
    const chartElement = document.getElementById('institution-stats-chart');
    if (!chartElement) return;
    
    const chart = echarts.init(chartElement);
    
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['حالات جديدة', 'حالات مغلقة'],
            bottom: 0
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'حالات جديدة',
                type: 'bar',
                data: [12, 15, 8, 18, 22, 16],
                itemStyle: {
                    color: '#00AEEF'
                }
            },
            {
                name: 'حالات مغلقة',
                type: 'bar',
                data: [8, 10, 6, 12, 15, 11],
                itemStyle: {
                    color: '#8BC643'
                }
            }
        ]
    };
    
    chart.setOption(option);
}

// Initialize activity feed animations
function initActivityFeed() {
    const activityItems = document.querySelectorAll('.activity-item');
    
    // Animate activity items with stagger
    anime({
        targets: activityItems,
        opacity: [0, 1],
        translateX: [-30, 0],
        delay: anime.stagger(200),
        duration: 600,
        easing: 'easeOutExpo'
    });
}

// Initialize responsive features
function initResponsiveFeatures() {
    // Handle window resize
    window.addEventListener('resize', function() {
        // Resize charts on window resize
        const charts = document.querySelectorAll('[id$="-chart"]');
        charts.forEach(chartElement => {
            const chart = echarts.getInstanceByDom(chartElement);
            if (chart) {
                chart.resize();
            }
        });
    });
    
    // Handle mobile navigation
    initMobileNavigation();
}

// Initialize mobile navigation
function initMobileNavigation() {
    // Add touch feedback for mobile
    const touchElements = document.querySelectorAll('.card-hover, .nav-item, button');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// Initialize mobile menu button (hamburger) and behavior
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-button');
    const nav = document.getElementById('mobile-nav');
    if (!btn || !nav) return;

    // Ensure correct initial aria state
    btn.setAttribute('aria-expanded', nav.classList.contains('hidden') ? 'false' : 'true');

    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.classList.contains('hidden')) {
            if (!nav.contains(e.target) && !btn.contains(e.target)) {
                nav.classList.add('hidden');
                btn.setAttribute('aria-expanded', 'false');
            }
        }
    });
}

function toggleMobileMenu() {
    const btn = document.getElementById('mobile-menu-button');
    const nav = document.getElementById('mobile-nav');
    if (!btn || !nav) return;

    const isHidden = nav.classList.contains('hidden');
    if (isHidden) {
        nav.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
    } else {
        nav.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
    }
}

// Dashboard initialization
function initDashboard() {
    // Initialize dashboard data
    dashboardData = {
        mother: {
            children: ['أحمد', 'سارة'],
            progress: [75, 82],
            upcomingSessions: 2
        },
        teacher: {
            pendingCases: 5,
            activeStudents: 25,
            completedAssessments: 18
        },
        specialist: {
            newReferrals: 3,
            todaySessions: 4,
            pendingReports: 2
        },
        institution: {
            teamMembers: 17,
            activeCases: 45,
            monthlyGrowth: 12
        },
        researcher: {
            pendingRequests: 2,
            approvedStudies: 3,
            dataAccess: 1247
        }
    };
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg max-w-sm ${
        type === 'success' ? 'bg-dys-green text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        type === 'warning' ? 'bg-dys-orange text-white' :
        'bg-dys-cyan text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        opacity: [0, 1],
        translateX: [100, 0],
        duration: 300,
        easing: 'easeOutExpo'
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            opacity: 0,
            translateX: 100,
            duration: 300,
            easing: 'easeInExpo',
            complete: () => {
                document.body.removeChild(notification);
            }
        });
    }, 3000);
}
// Initialize responsive features
function initResponsiveFeatures() {
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Resize charts on window resize
            const charts = document.querySelectorAll('[id$="-chart"]');
            charts.forEach(chartElement => {
                const chart = echarts.getInstanceByDom(chartElement);
                if (chart) {
                    chart.resize();
                }
            });
            
            // Re-optimize for mobile if needed
            optimizeForMobile();
        }, 250);
    });
    
    // Handle mobile navigation
    initMobileNavigation();
    
    // Prevent zoom on double tap (iOS)
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}
// Detect mobile devices
function isMobileDevice() {
    return window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
}

// Optimize for mobile
function optimizeForMobile() {
    if (!isMobileDevice()) return;
    
    // Disable heavy animations on mobile
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .floating-element { 
                display: none !important; 
            }
            .card-hover:hover { 
                transform: none !important; 
                box-shadow: none !important; 
            }
            * {
                -webkit-tap-highlight-color: transparent;
            }
        }
        
        @media (max-width: 480px) {
            .text-4xl { font-size: 1.75rem !important; }
            .text-2xl { font-size: 1.5rem !important; }
            .text-xl { font-size: 1.25rem !important; }
        }
    `;
    document.head.appendChild(style);
}

// Update initializeApp function
function initializeApp() {
    // Initialize typewriter effect for hero text
    initTypewriter();
    
    // Initialize animations
    initAnimations();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize mobile menu (if present)
    initMobileMenu();
    
    // Initialize dashboard functionality
    initDashboard();
    
    // Initialize activity feed animations
    initActivityFeed();
    
    // Initialize responsive features
    initResponsiveFeatures();
    
    // Optimize for mobile
    optimizeForMobile();
}

// Export functions for global access
window.selectRole = selectRole;
window.showNotification = showNotification;