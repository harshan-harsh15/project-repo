// ================= SMOOTH SCROLL =================
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});


// ================= SCROLL REVEAL =================
const sections = document.querySelectorAll("section");

function revealSections() {
    const trigger = window.innerHeight * 0.85;

    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;

        if (top < trigger) {
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
        }
    });
}

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);


// ================= NAVBAR EFFECT =================
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(2, 6, 23, 0.85)";
        navbar.style.backdropFilter = "blur(10px)";
        navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.3)";
    } else {
        navbar.style.background = "transparent";
        navbar.style.boxShadow = "none";
    }
});


// ================= CONTACT FORM =================
// ================= CONTACT FORM =================
const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const button = form.querySelector("button");
        button.textContent = "Sending...";

        const formData = {
            name: form.querySelector("input[name='name']").value,
            email: form.querySelector("input[name='email']").value,
            message: form.querySelector("textarea[name='message']").value
        };

        try {
            const res = await fetch("https://project-repo-nq1e.onrender.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                button.textContent = "Message Sent ✅";
                form.reset();
            } else {
                button.textContent = "Error ❌";
            }
        } catch (err) {
            console.log(err);
            button.textContent = "Failed ❌";
        }

        setTimeout(() => {
            button.textContent = "Send Message";
        }, 2000);
    });
}

// ================= TYPING EFFECT =================
const text = "Web Developer • Building Real Projects";
const typingElement = document.querySelector(".hero-box p");

let index = 0;

function typeEffect() {
    if (typingElement && index < text.length) {
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 35);
    }
}

if (typingElement) {
    typingElement.textContent = "";
    window.addEventListener("load", typeEffect);
}


// ================= PROJECT CARD TILT EFFECT (🔥) =================
const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 10;
        const rotateY = (x - centerX) / 10;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    });
});