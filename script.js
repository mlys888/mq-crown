// MQ 裁缝店 - script.js (全站通用)

/** 1) 告诉 CSS：JS 已启动（避免白屏） */
document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  /** 2) 移动端菜单 */
  const menuBtn = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });

    // 点击菜单项后自动收起
    mobileMenu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => mobileMenu.classList.remove("open"));
    });
  }

  /** 3) 平滑滚动（锚点） */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const topNavH = 64; // 与 CSS --top-nav-h 保持一致即可
      const y = target.getBoundingClientRect().top + window.scrollY - (topNavH + 10);
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  /** 4) section 滚动出现动画（IntersectionObserver） */
  const sections = Array.from(document.querySelectorAll("main section"));
  if ("IntersectionObserver" in window && sections.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.12 });

    sections.forEach(sec => io.observe(sec));
  } else {
    // 浏览器不支持或没有 section：直接显示
    sections.forEach(sec => sec.classList.add("visible"));
  }

  /** 5) 弹窗 popup：默认不遮挡（如果 HTML 里误写 active，会被修正） */
  document.querySelectorAll(".popup.active").forEach(el => el.classList.remove("active"));

  /** 6) 关闭弹窗按钮 */
  document.addEventListener("click", (e) => {
    const closeBtn = e.target.closest(".close-popup");
    if (!closeBtn) return;

    const popup = closeBtn.closest(".popup") || document.querySelector(".popup");
    if (popup) popup.classList.remove("active");
  });

  /** 7) 底部导航 active 高亮（按当前页面） */
  const path = (location.pathname || "").toLowerCase();
  const setActive = (selector) => {
    const el = document.querySelector(selector);
    if (el) el.classList.add("active");
  };

  // 先清空
  document.querySelectorAll(".bottom-nav a").forEach(a => a.classList.remove("active"));

  if (path.endsWith("/index.html") || path.endsWith("/mq-crown/") || path.endsWith("/mq-crown")) {
    setActive('.bottom-nav a[data-page="home"]');
  } else if (path.endsWith("/pricing.html")) {
    setActive('.bottom-nav a[data-page="pricing"]');
  } else if (path.endsWith("/services.html")) {
    setActive('.bottom-nav a[data-page="services"]');
  } else if (path.endsWith("/blog.html") || path.includes("zipper") || path.includes("pants") || path.includes("jeans") || path.includes("curtain") || path.includes("why-") || path.includes("top-") || path.includes("day-")) {
    setActive('.bottom-nav a[data-page="blog"]');
  } else if (path.endsWith("/contact.html")) {
    setActive('.bottom-nav a[data-page="contact"]');
  } else if (path.endsWith("/gallery.html")) {
    setActive('.bottom-nav a[data-page="gallery"]');
  }

  /** 8) 兜底：如果 main 里只有一个 section、页面看起来空白，强制让它可见 */
  const firstSection = document.querySelector("main section");
  if (firstSection) firstSection.classList.add("visible");
});
