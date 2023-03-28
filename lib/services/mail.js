'use strict';

require('dotenv').config();
const { Service } = require('@hapipal/schmervice');
const { transporter } = require('../../server/mailer');

module.exports = class MailServices extends Service {
  sendMail(user) {

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: user.mail,
      subject: 'Votre compte à bien été créé',
      text: 'Bienvenue ' + user.userName + ' !'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent:' + info.response);
      }
    })
  }

  async sendMailNewMovie(movie, userService) {

    const users = await userService.getAll();

    users.forEach(user => {
      const mailOptions = {
        from: process.env.MAIL_USER,
        to: user.mail,
        subject: 'Un nouveau film est disponible',
        text: 'Le film ' + movie.title + ' viens d\'être ajouté',
      }

      transporter.sendMail(mailOptions, (error, info) => {
        error ? console.log(error) : console.log('Email sent' + info.response);
      });
    });
  }

  async sendMailEditedMovie(movie, userService) {
    const { Favories } = this.server.models();

    const users = await userService.getAll();
    const favories = await Favories.query().select();

    const listOfUsers = favories.reduce((userList, favorite) => (
      favorite.idMovie == movie.id && userList.push(users.find(user => user.id === favorite.idUser)),
      userList
    ), []);

    listOfUsers.forEach(user => {
      const mailOptions = {
        from: process.env.MAIL_USER,
        to: user.mail,
        subject: 'Le film ' + movie.title + ' a été mis à jour',
        text: 'Bonne nouvelle, le film ' + movie.title + ' viens d\'être mis à jour !!',
      }

      transporter.sendMail(mailOptions, (error, info) => {
        error ? console.log(error) : console.log('Email sent' + info.response);
      });
    })
  }

}
