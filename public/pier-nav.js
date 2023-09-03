const mobileNavigationMenu = document.querySelector("#mobileNavigationMenu");
const mainNavigationBar = document.querySelector("#mainNavigationMenu");

function toggleMenu() {
	mobileNavigationMenu.classList.toggle("open");
	document.body.classList.toggle("overflow-hidden");
}

const mainNavigationBarObserver = new IntersectionObserver(
	([e]) => {
		mainNavigationBar.classList.toggle("scrolled", e.intersectionRatio < 1);
	},
	{
		threshold: [1],
	}
);

mainNavigationBarObserver.observe(mainNavigationBar);
