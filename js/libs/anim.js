//<Проверка на мобильное устройство>===================================================

// Проверяет, открыт браузер с мобильного устройства или нет
// Использование:
// if (isMobile.any()) {} - Если вернёт true, значит страница открыта на мобильном устройстве
let isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android()
			|| isMobile.BlackBerry()
			|| isMobile.iOS()
			|| isMobile.Opera()
			|| isMobile.Windows()
		);
	}
};

//</Проверка на мобильное устройство>==================================================

//<Animations>=========================================================================
if (!isMobile.any()) {
	const animItems = document.querySelectorAll('[data-anim]');

	// Изначально скрывает объекты
	animItems.forEach(element => {
		element.style.opacity = 0;
	})

	if (animItems.length > 0) {
		window.addEventListener('scroll', animOnScroll);
		function animOnScroll() {
			for (let index = 0; index < animItems.length; index++) {
				const animItem = animItems[index];
				const animItemHeight = animItem.offsetHeight;
				const animItemOffset = offset(animItem).top;
				const animStart = 2;


				let animItemPoint = window.innerHeight - animItemHeight / animStart;
				if (animItemHeight > window.innerHeight) {
					animItemPoint = window.innerHeight - window.innerHeight / animStart;
				}

				if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {

					// Добавление анимации ---
					if (animItem.dataset.anim) {
						animItem.style.animation = `${animItem.dataset.anim} .7s forwards`;
					}

					// Кастомизация анимации ====================

					// data-delay // Задержка анимации ---
					if (animItem.dataset.delay) {
						animItem.style.animationDelay = animItem.dataset.delay + 's';
					}

					// data-duration // Скорость анимации ---
					if (animItem.dataset.duration) {
						animItem.style.animationDuration = animItem.dataset.duration + 's';
					}

				}
				else { // Включает зеркальную анимацию
					if (animItem.dataset.animReverse == "true") {
						animItem.style.animation = void 0;
					}
				}
			}
		}
		function offset(el) {
			const rect = el.getBoundingClientRect(),
				scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
				scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
		}

		setTimeout(() => {
			animOnScroll();
		}, 300);
	}
}
//</Animations>========================================================================