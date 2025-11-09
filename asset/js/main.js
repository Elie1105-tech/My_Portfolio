$(document).ready(function() {
    // Loader
    setTimeout(function() {
        $('#loader').fadeOut(500);
    }, 1500);

    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Smooth scrolling
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });

    // Fade in on scroll
    function checkFadeIn() {
        $('.fade-in').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('visible');
            }
        });
    }
    
    $(window).on('scroll', checkFadeIn);
    checkFadeIn();

    // Counter animation
    function animateCounter() {
        $('.stat-number').each(function() {
            var $this = $(this);
            var target = parseInt($this.data('target'));
            var current = parseInt($this.text());
            
            if (current < target) {
                $({ Counter: current }).animate({ Counter: target }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.ceil(this.Counter));
                    },
                    complete: function() {
                        $this.text(target + '+');
                    }
                });
            }
        });
    }

    var counterAnimated = false;
    $(window).on('scroll', function() {
        if (!counterAnimated) {
            var statsTop = $('.stats-container').offset().top;
            var statsBottom = statsTop + $('.stats-container').outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (statsBottom > viewportTop && statsTop < viewportBottom) {
                animateCounter();
                counterAnimated = true;
            }
        }
    });

    // Projects filter
    $('.filter-btn').on('click', function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        var filter = $(this).data('filter');
        
        if (filter === 'all') {
            $('.project-card').fadeIn(500);
        } else {
            $('.project-card').hide();
            $('.project-card[data-category="' + filter + '"]').fadeIn(500);
        }
    });

    // Project modal
    $('#projectModal').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget);
        var title = button.data('title');
        var desc = button.data('desc');
        var tech = button.data('tech');
        
        var modal = $(this);
        modal.find('#modalTitle').text(title);
        modal.find('#modalDesc').text(desc);
        
        // Créer les badges de technologies
        var techList = modal.find('#modalTechList');
        techList.empty();
        
        if (tech) {
            var technologies = tech.split(',');
            technologies.forEach(function(technology) {
                var badge = $('<span>')
                    .addClass('modal-tech-tag')
                    .text(technology.trim());
                techList.append(badge);
            });
        }
    });

    // Contact form
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais. 🚀');
        this.reset();
    });

    // Mobile menu close on link click
    $('.navbar-nav a').on('click', function() {
        $('.navbar-collapse').collapse('hide');
    });

    // Fermeture du modal et navigation
    $(document).on('click', '.modal-buttons a', function(e) {
        e.preventDefault();
        var targetSection = $(this).attr('href');
        
        // Fermer le modal
        $('#projectModal').modal('hide');
        
        // Attendre que le modal soit complètement fermé avant de naviguer
        setTimeout(function() {
            if (targetSection && targetSection.startsWith('#')) {
                var target = $(targetSection);
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 80
                    }, 1000);
                }
            }
        }, 400);
    });
});