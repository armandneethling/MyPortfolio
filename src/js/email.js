import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

function initializeEmailJS() {
    if (PUBLIC_KEY) {
        emailjs.init({ publicKey: PUBLIC_KEY });
    } else {
        console.error("EmailJS Public Key is not defined. Ensure your .env file is correctly configured.");
    }
}

function sendEmailWithParams(templateParams) {
    if (!SERVICE_ID || !TEMPLATE_ID) {
        console.error("EmailJS Service ID or Template ID is not defined.");
        return;
    }

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
        .then(response => {
            console.info('Email sent successfully!', response.status, response.text);
        })
        .catch(error => {
            console.error('Failed to send email...', error);
        });
}

function sendEmailFromForm(formElement) {
    if (!SERVICE_ID || !TEMPLATE_ID) {
        console.error("EmailJS Service ID or Template ID is not defined.");
        return;
    }

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formElement)
        .then(response => {
            console.info('Email sent successfully!', response.status, response.text);
            formElement.reset();
        })
        .catch(error => {
            console.error('Failed to send email...', error);
        });
}

const contactFormElement = document.getElementById('contactForm');

if (contactFormElement) {
    contactFormElement.addEventListener('submit', function(event) {
        event.preventDefault();
        sendEmailFromForm(this);
    });
} else {
    console.warn("Form with ID 'contactForm' not found. Email sending functionality may be unavailable.");
}

initializeEmailJS();

