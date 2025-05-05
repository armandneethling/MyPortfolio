// EmailJS integration for sending emails from a contact form
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

function initializeEmailJS() {
    if (!EMAILJS_PUBLIC_KEY) {
        throw new Error('EmailJS Public Key is not defined. Ensure your .env file is correctly configured.');
    }

    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

function sendEmail(templateParams) {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
        throw new Error('EmailJS Service ID or Template ID is not defined.');
    }

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then((response) => {
            console.info('Email sent successfully!', response.status, response.text);
        })
        .catch((error) => {
            console.error('Failed to send email...', error);
        });
}

function sendEmailFromForm(formElement) {
    if (!formElement) {
        throw new Error('Form element is null or undefined. Email sending functionality may be unavailable.');
    }

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formElement)
        .then((response) => {
            console.info('Email sent successfully!', response.status, response.text);
            formElement.reset();
        })
        .catch((error) => {
            console.error('Failed to send email...', error);
        });
}

const contactFormElement = document.getElementById('contactForm');

if (contactFormElement) {
    contactFormElement.addEventListener('submit', (event) => {
        event.preventDefault();
        sendEmailFromForm(contactFormElement);
    });
} else {
    throw new Error("Form with ID 'contactForm' not found. Email sending functionality may be unavailable.");
}

initializeEmailJS();

