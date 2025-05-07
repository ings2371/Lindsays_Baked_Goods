import { Resend } from 'resend';

const resend = new Resend('re_5XLJeyLJ_5ZcDtAXUKFLuW3YRg3HujnoR');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'curtisjlbutler@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});