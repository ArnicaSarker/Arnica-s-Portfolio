/* =========================================================
   ARNICA SARKER — ACADEMIC PORTFOLIO
   Vanilla JavaScript only
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const sidebar =
        document.getElementById("sidebar");

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const sections =
        document.querySelectorAll("section[id]");

    const backToTop =
        document.getElementById("backToTop");

    const pageFooter =
        document.getElementById("pageFooter");


    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    if (menuToggle && sidebar) {

        menuToggle.addEventListener(
            "click",
            function () {

                const isOpen =
                    sidebar.classList.toggle("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

                menuToggle.innerHTML =
                    isOpen
                        ? '<i class="fas fa-times"></i>'
                        : '<i class="fas fa-bars"></i>';
            }
        );
    }


    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (
                    window.innerWidth <= 820 &&
                    sidebar &&
                    menuToggle
                ) {
                    sidebar.classList.remove("open");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.innerHTML =
                        '<i class="fas fa-bars"></i>';
                }
            }
        );
    });


    /* =====================================================
       ACTIVE NAVIGATION WHILE SCROLLING
    ====================================================== */

    if ("IntersectionObserver" in window) {

        const sectionObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (!entry.isIntersecting) {
                                return;
                            }

                            navLinks.forEach(
                                function (link) {
                                    link.classList.remove(
                                        "active"
                                    );
                                }
                            );

                            const activeLink =
                                document.querySelector(
                                    '.nav-link[href="#' +
                                    entry.target.id +
                                    '"]'
                                );

                            if (activeLink) {
                                activeLink.classList.add(
                                    "active"
                                );
                            }
                        }
                    );
                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px",

                    threshold: 0
                }
            );

        sections.forEach(
            function (section) {
                sectionObserver.observe(section);
            }
        );
    }


    /* =====================================================
       BACK TO TOP
    ====================================================== */

    function updateBackToTop() {

        if (!backToTop) {
            return;
        }

        backToTop.classList.toggle(
            "show",
            window.scrollY > 500
        );
    }

    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );

    updateBackToTop();


    /* =====================================================
       MOVE BACK-TO-TOP ABOVE FOOTER
       Prevents overlap with footer links
    ====================================================== */

    if (
        pageFooter &&
        backToTop &&
        "IntersectionObserver" in window
    ) {

        const footerObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            backToTop.classList.toggle(
                                "above-footer",
                                entry.isIntersecting
                            );
                        }
                    );
                },
                {
                    threshold: 0.05
                }
            );

        footerObserver.observe(pageFooter);
    }


    /* =====================================================
       CLOSE MOBILE SIDEBAR WHEN CLICKING OUTSIDE
    ====================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                window.innerWidth <= 820 &&
                sidebar &&
                menuToggle &&
                sidebar.classList.contains("open") &&
                !sidebar.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                sidebar.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.innerHTML =
                    '<i class="fas fa-bars"></i>';
            }
        }
    );


    /* =====================================================
       CERTIFICATE MODAL
    ====================================================== */

    const certificateCards =
        document.querySelectorAll(
            ".certificate-card"
        );

    const modal =
        document.getElementById(
            "certificateModal"
        );

    const modalImage =
        document.getElementById(
            "certificateModalImage"
        );

    const modalTitle =
        document.getElementById(
            "certificateModalTitle"
        );

    const modalCloseButtons =
        document.querySelectorAll(
            "[data-close-modal]"
        );


    function openCertificateModal(card) {

        if (
            !modal ||
            !modalImage ||
            !modalTitle
        ) {
            return;
        }

        const image =
            card.getAttribute("data-image");

        const title =
            card.getAttribute("data-title");

        modalImage.src =
            image || "";

        modalImage.alt =
            title || "Certificate";

        modalTitle.textContent =
            title || "Certificate";

        modal.classList.add("open");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );
    }


    function closeCertificateModal() {

        if (!modal) {
            return;
        }

        modal.classList.remove("open");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );
    }


    certificateCards.forEach(
        function (card) {

            card.addEventListener(
                "click",
                function () {

                    openCertificateModal(
                        card
                    );
                }
            );
        }
    );


    modalCloseButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                closeCertificateModal
            );
        }
    );


    /* =====================================================
       CLOSE CERTIFICATE MODAL WITH ESC KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal &&
                modal.classList.contains("open")
            ) {
                closeCertificateModal();
            }
        }
    );

});