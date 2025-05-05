import emailjs from '@emailjs/browser';

const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

if (publicKey) {
    emailjs.init({
        publicKey: publicKey,
    });
} else {
    console.error("EmailJS Public Key is not defined. Make sure your .env file is set up correctly and accessible.");
}

function sendEmailWithParams(templateParams) {
    if (!serviceID || !templateID) {
        console.error("EmailJS Service ID or Template ID is not defined.");
        return;
    }

    emailjs.send(serviceID, templateID, templateParams)
        .then((response) => {
           console.log('Email sent successfully!', response.status, response.text);
        }, (error) => {
           console.log('Failed to send email...', error);
        });
}
function sendEmailFromForm(formElement) {
     if (!serviceID || !templateID) {
        console.error("EmailJS Service ID or Template ID is not defined.");
        return;
    }

    emailjs.sendForm(serviceID, templateID, formElement)
        .then((response) => {
           console.log('Email sent successfully!', response.status, response.text);
           formElement.reset();
        }, (error) => {
           console.log('Failed to send email...', error);
        });
}
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        sendEmailFromForm(this);
    });
} else {
    console.warn("Form with ID 'contactForm' not found. Email sending functionality may not work.");
}
