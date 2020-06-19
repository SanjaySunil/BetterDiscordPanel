const Globals = {
	user: null,
	locale: 'en-us'
};

const Statuses = {
	ONLINE: 'online',
	IDLE: 'bad-connection',
	OFFLINE: 'offline'
};

const Debounce = (func, wait = 200, immediate = false) => {
    let timeout;
    return (...args) => {
        const context = this;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

const SetFooter = () => {
	const icon = document.querySelector('footer .user-icon img');
	icon.src = Globals.user.icon;
	const status = document.querySelector('footer .user-icon .status');
	status.className = '';
	status.classList.add('status');
	status.classList.add(Globals.user.status)
	const name = document.querySelector('footer .user-info p');
	name.textContent = Globals.user.name;
	const id = document.querySelector('footer .user-info span');
	id.textContent = `#${Globals.user.id}`;
};

const Login = (form, cont, e) => {
	e.preventDefault();
	const data = new FormData(form);
	const email = data.get('email');
	const emailError = form.querySelector('label[for="email"] span');
	const password = data.get('password');
	const passwordError = form.querySelector('label[for="password"] span');
	emailError.innerHTML = '';
	passwordError.innerHTML = '';
	if (email !== '' && password !== '') {
		cont.classList.remove('show');
		form.querySelector('[name="email"]').value = '';
		form.querySelector('[name="password"]').value = '';
		
		let d = new Date();
		d.setDate(d.getDate() - 1);
		Globals.user = {
			id: '0000',
			name: 'USER',
			icon: 'https://picsum.photos/200?gravity=west',
			status: Statuses.ONLINE,
			lastOnline: d
		};
		SetFooter();
		return false;
	}
	if (email === '') emailError.innerHTML = 'Please provide a valid email address.';
	if (password === '') passwordError.innerHTML = 'Please provide a password.';
};

const AddMessage = (form, e) => {
	e.preventDefault();
	const data = new FormData(form);
	const message = data.get('message');
	const userData = Globals.user;
	
	if (!message || message === '') return false;
	
	const container = document.createElement('div');
	const iconCont = container.cloneNode();
	iconCont.classList.add('user-icon');
	const icon = document.createElement('img');
	icon.src = userData.icon;
	iconCont.appendChild(icon);
	container.appendChild(iconCont);
	const userCont = container.cloneNode();
	userCont.classList.add('user-info');
	const user = document.createElement('p');
	user.textContent = userData.name;
	userCont.appendChild(user);
	const time = document.createElement('span');
	time.textContent = userData.status === Statuses.ONLINE
		? new Date().toLocaleTimeString(Globals.locale, { hour: '2-digit', minute: '2-digit' })
		: (userData.lastOnline.getDate() === new Date().getDate() - 1
			? `Yesterday at ${userData.lastOnline.toLocaleTimeString(Globals.locale, { hour: '2-digit', minute:'2-digit' })}`
			: userData.lastOnline.toLocaleString(Globals.locale));
	userCont.appendChild(time);
	container.appendChild(userCont);
	const messageCont = container.cloneNode();
	messageCont.classList.add('message-text');
	messageCont.textContent = message;
	container.appendChild(messageCont);
	document.querySelector('.messages').appendChild(container);
	
	form.querySelector('[name="message"]').value = '';
};



(() => {
	const LoginEl = document.querySelector('#login');
	const LoginForm = document.querySelector('#login form');
	LoginForm.addEventListener('submit', Login.bind(null, LoginForm, LoginEl));
	
	
	
	const MessageForm = document.querySelector('main form');
	MessageForm.addEventListener('submit', AddMessage.bind(null, MessageForm));
	
	
	
	const Nav = document.querySelector('nav');
	const Sub = document.querySelector('#sub');
	const Footer = document.querySelector('footer');
	
	const navToggle = document.getElementById('toggle-nav');
	navToggle.addEventListener('click', e => {
		if (navToggle.dataset.show === "true") {
			navToggle.dataset.show = false;
			Nav.classList.remove('show');
			Sub.classList.remove('show');
			Footer.classList.remove('show');
			return;
		}
		navToggle.dataset.show = true;
		Nav.classList.add('show');
		Sub.classList.add('show');
		Footer.classList.add('show');
	});
	window.addEventListener('resize', Debounce(e => {
		const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		if (width > 940) {
			navToggle.dataset.show = false;
			Nav.classList.remove('show');
			Sub.classList.remove('show');
			Footer.classList.remove('show');
		}
	}), false);
	

	
	const NavButtons = document.querySelectorAll('nav button:not(.add)');
	NavButtons.forEach(button => {
		button.addEvenListener('click', e => {
			document.querySelector('nav button.active').classList.remove('active');
			button.classList.add('active');
		});
	});
})();
