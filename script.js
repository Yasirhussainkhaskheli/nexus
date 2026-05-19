/* ── Logo Widget Function (Global Scope) ── */
function showAlert() {
  document.getElementById('customAlert').classList.add('show');
  document.getElementById('companyInput').focus();
}
function closeAlert() {
  document.getElementById('customAlert').classList.remove('show');
}

function goToSteps() {
  const name = document.getElementById("companyInput").value.trim();
  if (!name) {
    showAlert();
    return;
  }
  const encoded = encodeURIComponent(name);
  window.location.href = "logo-steps.html?company=" + encoded;
}

document.addEventListener("DOMContentLoaded", () => {
  /* ── Navbar scroll effect ── */
  const navbar = document.getElementById("navbar");
  const hero = document.getElementById("hero");
  const heroVideo = document.getElementById("hero-video");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
    document
      .getElementById("backTop")
      .classList.toggle("show", window.scrollY > 400);
  });

  if (hero && heroVideo) {
    const enableHeroFallback = () => {
      hero.classList.add("video-fallback");
    };

    heroVideo.addEventListener("error", enableHeroFallback);

    const source = heroVideo.querySelector("source");
    if (source) {
      source.addEventListener("error", enableHeroFallback);
    }
  }

  /* ── Hamburger ── */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
  });
  document.querySelectorAll(".mobile-link, .mobile-menu .btn").forEach((el) => {
    el.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("open");
    });
  });

  /* ── Portfolio filter ── */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioGrid = document.getElementById("portfolioGrid");
  const portfolioItems = Array.from(document.querySelectorAll(".portfolio-item"));
  const portfolioSeeMoreWrap = document.querySelector(".portfolio-see-more");
  const portfolioSeeMoreBtn = document.getElementById("portfolioSeeMoreBtn");
  const initialPortfolioRows = 4;
  const portfolioRowsPerClick = 2;
  let currentPortfolioFilter = "all";
  let currentAllRows = initialPortfolioRows;

  function getPortfolioColumnCount() {
    const columns = window.getComputedStyle(portfolioGrid).gridTemplateColumns;
    return Math.max(columns.split(" ").filter(Boolean).length, 1);
  }

  function animatePortfolioItem(item) {
    item.style.animation = "none";
    item.offsetHeight;
    item.style.animation = "fadeIn 0.35s ease";
  }

  function updatePortfolioView() {
    const sourceItems =
      currentPortfolioFilter === "all"
        ? portfolioItems
        : portfolioItems.filter(
            (item) => item.dataset.category === currentPortfolioFilter,
          );
    const visibleLimit =
      currentPortfolioFilter === "all"
        ? getPortfolioColumnCount() * currentAllRows
        : sourceItems.length;

    portfolioItems.forEach((item) => {
      item.style.display = "none";
    });

    sourceItems.forEach((item, index) => {
      item.style.order = index;
      const shouldShow = index < visibleLimit;
      item.style.display = shouldShow ? "block" : "none";
      if (shouldShow) {
        animatePortfolioItem(item);
      }
    });

    const hasMoreItems =
      currentPortfolioFilter === "all" && visibleLimit < sourceItems.length;
    portfolioSeeMoreWrap.style.display = hasMoreItems ? "block" : "none";
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentPortfolioFilter = btn.dataset.filter;
      if (currentPortfolioFilter === "all") {
        currentAllRows = initialPortfolioRows;
      }
      updatePortfolioView();
    });
  });

  portfolioSeeMoreBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (currentPortfolioFilter !== "all") {
      return;
    }
    currentAllRows += portfolioRowsPerClick;
    updatePortfolioView();
  });

  window.addEventListener("resize", updatePortfolioView);
  updatePortfolioView();

  /* ── Pricing tabs ── */
  const pricingPlans = {
    logo: {
      plans: ["Basic", "Standard", "Premium"],
      prices: [149, 299, 499],
      old: [299, 599, 999],
      features: [
        [
          "3 Logo Concepts",
          "2 Revision Rounds",
          "All File Formats (PNG, SVG, PDF)",
          "Brand Color Palette",
          "5-Day Delivery",
        ],
        [
          "6 Logo Concepts",
          "Unlimited Revisions",
          "Full Brand Identity Kit",
          "Business Card Design",
          "Social Media Kit",
          "Brand Style Guide",
          "3-Day Priority Delivery",
        ],
        [
          "10 Logo Concepts",
          "Unlimited Revisions",
          "Complete Brand Identity",
          "Full Stationery Design",
          "3D Logo Mockups",
          "Motion Logo Animation",
          "Dedicated Brand Manager",
          "Same-Day Rush Delivery",
        ],
      ],
    },
    website: {
      plans: ["Starter", "Business", "Enterprise"],
      prices: [299, 599, 999],
      old: [599, 1199, 1999],
      features: [
        [
          "5-Page Responsive Website",
          "Mobile Optimised",
          "Contact Form Integration",
          "Basic SEO Setup",
          "1 Month Support",
        ],
        [
          "Up to 20 Pages",
          "Custom UI/UX Design",
          "CMS Integration (WordPress)",
          "Advanced SEO",
          "E-Commerce Ready",
          "3 Months Support",
          "Speed Optimisation",
        ],
        [
          "Unlimited Pages",
          "Custom Web Application",
          "API Integrations",
          "Full E-Commerce Suite",
          "12 Months Priority Support",
          "Dedicated Developer",
          "Performance Dashboard",
        ],
      ],
    },
    marketing: {
      plans: ["Starter", "Growth", "Scale"],
      prices: [199, 449, 849],
      old: [399, 899, 1699],
      features: [
        [
          "Google Ads Management",
          "$500 Ad Spend Managed",
          "Monthly Report",
          "Keyword Research",
          "1 Campaign",
        ],
        [
          "Google + Meta Ads",
          "$2,000 Ad Spend Managed",
          "Weekly Reports",
          "A/B Testing",
          "Retargeting Campaigns",
          "Dedicated Manager",
        ],
        [
          "Omni-Channel Marketing",
          "$5,000+ Ad Spend Managed",
          "Daily Reporting Dashboard",
          "Funnel Strategy",
          "CRM Integration",
          "Influencer Outreach",
          "Quarterly Strategy Review",
        ],
      ],
    },
  };

  const pricingTabs = document.querySelectorAll(".pricing-tab");
  pricingTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      pricingTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      renderPricing(tab.dataset.plan);
    });
  });

  function renderPricing(planKey) {
    const data = pricingPlans[planKey];
    const grid = document.getElementById("pricingGrid");
    grid.innerHTML = data.plans
      .map((plan, i) => {
        const isFeatured = i === 1;
        const featClass = isFeatured ? " featured" : "";
        const btnClass = isFeatured ? "btn" : "btn btn-primary";
        const featBadge = isFeatured
          ? '<div class="popular-badge"><i class="fa-solid fa-fire"></i>&nbsp; Most Popular</div>'
          : "";
        const featureItems = data.features[i]
          .map((f) => `<li><i class="fa-solid fa-circle-check"></i> ${f}</li>`)
          .join("");
        return `
        <div class="pricing-card${featClass}">
          ${featBadge}
          <div class="pricing-plan">${plan}</div>
          <div class="pricing-amount">
            <span class="currency">$</span>
            <span class="price">${data.prices[i]}</span>
            <span class="period">&nbsp;/mo</span>
          </div>
          <p class="old-price">Was $${data.old[i]}/mo — 50% off today</p>
          <hr class="pricing-divider" />
          <ul class="pricing-features">${featureItems}</ul>
          <a href="#contact" class="${btnClass}">Order Now</a>
        </div>`;
      })
      .join("");
  }

  /* ── Counter animation ── */
  const counters = [
    { el: "statYears", end: 8, suffix: "+", decimals: 0 },
    { el: "statClients", end: 1000, suffix: "+", decimals: 0 },
    { el: "statProjects", end: 2500, suffix: "+", decimals: 0 },
    { el: "statRating", end: 4.9, suffix: "", decimals: 1 },
  ];
  let countersStarted = false;

  function startCounters() {
    if (countersStarted) return;
    countersStarted = true;
    counters.forEach(({ el, end, suffix, decimals }) => {
      const elem = document.getElementById(el);
      if (!elem) return;
      const duration = 1600;
      const steps = 60;
      const increment = end / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(interval);
        }
        elem.textContent =
          (decimals > 0 ? current.toFixed(decimals) : Math.floor(current)) +
          suffix;
      }, duration / steps);
    });
  }

  /* ── Intersection Observer for counters ── */
  const aboutSection = document.getElementById("about");
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) startCounters();
    },
    { threshold: 0.3 },
  );
  if (aboutSection) observer.observe(aboutSection);

  /* ── Contact form ── */
  window.handleContactSubmit = function (e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML =
      '<i class="fa-solid fa-circle-check"></i>&nbsp; Consultation Booked!';
    btn.style.background = "#10b981";
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = "";
      btn.disabled = false;
      e.target.reset();
    }, 3500);
  };

  /* ── Scroll reveal ── */
  const revealEls = document.querySelectorAll(
    ".service-card, .testimonial-card, .pricing-card, .stat-card, .portfolio-item, .partner-badge, .review-card, .reviews-trustbar",
  );
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 },
  );

  revealEls.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 0.55s ease, transform 0.55s ease";
    revealObserver.observe(el);
  });

  /* ── Back to top ── */
  document.getElementById("backTop").addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ── Fade-in keyframes ── */
  const style = document.createElement("style");
  style.textContent = `@keyframes fadeIn { from { opacity:0; transform:scale(0.96); } to { opacity:1; transform:scale(1); } }`;
  document.head.appendChild(style);
  
  
//   Logo engine
  document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('companyInput').focus();
});

  /* ── Canvas network animation ── */
  const canvas = document.getElementById("network-bg");
  const ctx = canvas.getContext("2d");

  let particles = [];
  let animFrameId = null;
  let resizeTimer = null;

  const CONFIG = {
    count: window.innerWidth < 768 ? 120 : 250,
    maxDist: 200,
    mouseRepelRadius: 180,
    repelStrength: 0.045,
    speed: 0.4,
    colors: ["#7be8ff", "#fa8b8b", "#60a5fa"], // cyan, purple, blue
  };

  const pointer = { x: null, y: null };

  /* ── Resize (debounced) ── */
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector(".hero").offsetHeight;
  }

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resizeCanvas();
      init(); // respawn particles to new dimensions
    }, 200);
  });

  resizeCanvas();

  /* ── Pointer tracking ── */
  window.addEventListener("pointermove", (e) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
  });

  window.addEventListener("pointerleave", () => {
    pointer.x = null;
    pointer.y = null;
  });

  /* ── Particle class ── */
  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * CONFIG.speed;
      this.vy = (Math.random() - 0.5) * CONFIG.speed;
      this.baseR = 1.2 + Math.random() * 1.6; // 1.2 – 2.8 px
      this.r = this.baseR;
      this.color =
        CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
      this.phase = Math.random() * Math.PI * 2; // pulse phase offset
    }

    move(t) {
      /* gentle pulse in radius */
      this.r = this.baseR + Math.sin(t * 0.002 + this.phase) * 0.6;

      this.x += this.vx;
      this.y += this.vy;

      /* bounce off edges */
      if (this.x < 0) {
        this.x = 0;
        this.vx *= -1;
      }
      if (this.x > canvas.width) {
        this.x = canvas.width;
        this.vx *= -1;
      }
      if (this.y < 0) {
        this.y = 0;
        this.vy *= -1;
      }
      if (this.y > canvas.height) {
        this.y = canvas.height;
        this.vy *= -1;
      }

      /* mouse repulsion */
      if (pointer.x !== null) {
        const dx = this.x - pointer.x;
        const dy = this.y - pointer.y;
        const distSq = dx * dx + dy * dy;
        const rSq = CONFIG.mouseRepelRadius * CONFIG.mouseRepelRadius;

        if (distSq < rSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force =
            (CONFIG.mouseRepelRadius - dist) / CONFIG.mouseRepelRadius;
          this.x += (dx / dist) * force * CONFIG.repelStrength * 18;
          this.y += (dy / dist) * force * CONFIG.repelStrength * 18;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  /* ── Draw connections ── */
  function connect() {
    const maxDistSq = CONFIG.maxDist * CONFIG.maxDist;

    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          /* fade line based on distance */
          const alpha = 1 - distSq / maxDistSq;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(120, 210, 255, ${(alpha * 0.45).toFixed(2)})`;
          ctx.lineWidth = alpha * 1.2;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }

      /* lines to pointer */
      if (pointer.x !== null) {
        const dx = particles[a].x - pointer.x;
        const dy = particles[a].y - pointer.y;
        const distSq = dx * dx + dy * dy;
        const rSq = CONFIG.mouseRepelRadius * CONFIG.mouseRepelRadius;

        if (distSq < rSq) {
          const alpha = 1 - distSq / rSq;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(167, 139, 250, ${(alpha * 0.7).toFixed(2)})`; // purple lines to cursor
          ctx.lineWidth = alpha * 1.5;
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(particles[a].x, particles[a].y);
          ctx.stroke();
        }
      }
    }
  }

  /* ── Init ── */
  function init() {
    if (animFrameId) cancelAnimationFrame(animFrameId);
    CONFIG.count = window.innerWidth < 768 ? 60 : 130;
    particles = Array.from({ length: CONFIG.count }, () => new Particle());
    animate(0);
  }

  /* ── Animation loop ── */
  function animate(t) {
    animFrameId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.move(t);
      p.draw();
    });
    connect();
  }

  init();

  // Allow pressing Enter on the input
  const companyInput = document.getElementById("companyInput");
  if (companyInput) {
    companyInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") goToSteps();
    });
  }
}); // end DOMContentLoaded
