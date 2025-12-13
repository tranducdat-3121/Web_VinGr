const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".nav.prev");
const nextBtn = document.querySelector(".nav.next");
const dotsContainer = document.querySelector(".dots");

let currentSlide = 0;

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;

    document.querySelectorAll(".dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
}

if (prevBtn) prevBtn.addEventListener("click", prevSlide);
if (nextBtn) nextBtn.addEventListener("click", nextSlide);
if (slider) updateSlider();

function reveal() {
    let reveals = document.querySelectorAll(".reveal");

    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let revealTop = reveals[i].getBoundingClientRect().top;
        let revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add("show");
        }
    }
}

window.addEventListener("scroll", reveal);
reveal();

const scrollDownButton = document.querySelector(".scroll-down");
if (scrollDownButton) {
    scrollDownButton.onclick = () => {
        document.getElementById("overview").scrollIntoView({
            behavior: "smooth"
        });
    };
}


function createSnowflake() {
    const snow = document.createElement("div");
    snow.classList.add("snowflake");
    snow.innerHTML = "❆";

    snow.style.left = Math.random() * 100 + "%";
    snow.style.fontSize = (8 + Math.random() * 18) + "px";
    snow.style.animationDuration = (5 + Math.random() * 6) + "s";

    const snowContainer = document.querySelector(".snow-container");
    if (snowContainer) {
        snowContainer.appendChild(snow);
        setTimeout(() => snow.remove(), 12000);
    }
}

setInterval(createSnowflake, 500); 

const yearButtons = document.querySelectorAll(".year-btn");

yearButtons.forEach(button => {
    button.addEventListener("click", function() {

        const targetYear = this.getAttribute("data-year");

        yearButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
        
        const allMilestones = document.querySelectorAll(".milestone");
        
        allMilestones.forEach(milestone => {
            const milestoneYear = milestone.getAttribute("data-year-target");
            
            if (milestoneYear === targetYear) {
                milestone.classList.add("active-milestone");
            } 
            else {
                milestone.classList.remove("active-milestone");
            }
        });
        
        const historySection = document.getElementById("history");
        window.scrollTo({
            top: historySection.offsetTop - 50, 
            behavior: "smooth"
        });
    });
});
