  window.addEventListener("scroll", function () {
        let navbar = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

 <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

        // Initialize AOS with offset for fixed navbar
        AOS.init({
            duration: 1000,
            once: true,
            mirror: false,
            offset: 100
        });

        // Theme Toggle Functionality
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        let isDarkMode = true;

        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            isDarkMode = !isDarkMode;
            updateTheme();
        });

        function updateTheme() {
            if (isDarkMode) {
                body.classList.remove('light-theme');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i><span>Theme</span>';
            } else {
                body.classList.add('light-theme');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i><span>Theme</span>';
            }
        }

        // Enhanced Navigation
        document.addEventListener('DOMContentLoaded', function() {
            // Animate navbar items
            gsap.from('.navbar-nav .nav-item', {
                opacity: 0,
                y: -20,
                stagger: 0.2,
                duration: 1,
                ease: 'power2.out'
            });

            // Smooth scroll for navigation links
            document.querySelectorAll('.navbar-nav .nav-link').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        navbarToggler.click();
                    }
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        const headerHeight = document.querySelector('.navbar').offsetHeight;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Update active state
                        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                            link.classList.remove('active');
                        });
                        this.classList.add('active');
                    }
                });
            });
            
            // Update active nav item on scroll
            function updateActiveNavItem() {
                const scrollPosition = window.scrollY + document.querySelector('.navbar').offsetHeight + 50;
                const sections = document.querySelectorAll('section[id]');
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute('id');
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                            link.classList.remove('active');
                        });
                        document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`).classList.add('active');
                    }
                });
            }
            
            window.addEventListener('scroll', updateActiveNavItem);
            updateActiveNavItem();

            // Navbar background change on scroll
            const navbar = document.querySelector('.navbar');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                    gsap.to(navbar, {
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        duration: 0.3
                    });
                } else {
                    navbar.classList.remove('scrolled');
                    gsap.to(navbar, {
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        duration: 0.3
                    });
                }
            });
        });
