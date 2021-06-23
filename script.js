const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const learnMoreBtn = document.querySelector('.btn--scroll-to');

const openModal = function () {
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
};

const closeModal = function () {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++) btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
	if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
		closeModal();
	}
});

learnMoreBtn.addEventListener('click', function (e) {
	e.preventDefault();
	document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
	e.preventDefault();
	if (e.target.classList.contains('nav__link')) {
		document.querySelector(e.target.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
	}
});

const tab_parent = document.querySelector('.operations__tab-container');
const tab_btns = document.querySelectorAll('.operations__tab');
const tab_content = document.querySelectorAll('.operations__content');
tab_parent.addEventListener('click', function (e) {
	e.preventDefault();
	if (e.target.classList.contains('operations__tab-container')) return;
	tab_btns.forEach((tab) => tab.classList.remove('operations__tab--active'));
	const btn_target = e.target.closest('.operations__tab');
	btn_target.classList.add('operations__tab--active');
	tab_content.forEach((content) => content.classList.remove('operations__content--active'));
	document
		.querySelector(`.operations__content--${btn_target.getAttribute('data-tab')}`)
		.classList.add('operations__content--active');
});

const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const height = nav.getBoundingClientRect().height;

const obrCallback = (enteries, observer) =>{
    const [entery] = enteries;
    if(entery.isIntersecting){
      nav.classList.remove('sticky');
    }
    else{
      nav.classList.add('sticky'); 
    }
};
const obrOption = {
  root : null,
  threshold : 0,
  rootMargin : `-${height}px`,
};
const observer = new IntersectionObserver(obrCallback, obrOption);
observer.observe(header);

const sectionReveal = (enteries, observer) => {
	const [entery] = enteries;
	console.log(entery)
	if(entery.isIntersecting)
	{
		entery.target.classList.remove('section--hidden');
		observer.unobserve(entery.target);
	}
	
}

const revealSection = new IntersectionObserver(sectionReveal, {
	root : null,
	threshold : 0.15,
} );
document.querySelectorAll('.section').forEach(section => {
	revealSection.observe(section);
	section.classList.add('section--hidden');
})