const nodemailer = require('nodemailer');

class Mailer{

     constructor(){
        
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            secure:false,
            ssl: true,
            port : 3000,
            auth: {
                user: 'miaarchivos2020@gmail.com',
                pass: 'mia1234@Ab'
            }
          });
        

     }

     sendMail(mailOptions){
         console.log('Aqui debe mandar correo');
         this.transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
     }
}

module.exports= new Mailer();