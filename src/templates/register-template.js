'use strict'

const nodemailer = require('nodemailer');
require('dotenv').config();

this.sendEmail = (name) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPSSWD
        }
    });

    let mailOptions = {
        from: 'Pizza App',
        to: 'alexgomezde@gmail.com',
        subject: 'Bienvedido a Pizza App!',
        html: `

        <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
            <tr height="200px">  
                <td bgcolor="" width="600px">
                    <h1 style="color: #fff; text-align:center">Bienvenido</h1>
                    <p  style="color: #fff; text-align:center">
                        <span style="color: #e84393">${name}</span> 
                        a Pizza App!
                    </p>
                </td>
            </tr>
            <tr bgcolor="#fff">
                <td style="text-align:center">
                    <p style="color: #000">¡Un mundo de servicios a su disposición!</p>
                </td>
            </tr>
        </table>
        `
    };

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
        }else{
            console.log('El correo se envío correctamente: ' + info.response);
        }

    });

};  

module.export = this;