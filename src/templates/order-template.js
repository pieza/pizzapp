'use strict'

const nodemailer = require('nodemailer');
require('dotenv').config();

this.sendEmail = (order_id, email, price, name) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPSSWD
        }
    });

    let mailOptions = {
        from: 'Pizza App',
        to: email,
        subject: '¡Orden Recibida!',
        html: `

        <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
        <tr height="200px">  
            <td bgcolor="" width="600px">
                <h1 style="color: #FFF; text-align:center">¡Gracias por comprar en Pizzap!</h1>
                <p  style="color: #FFF; text-align:center">
                    <span style="color: #F48982">${name}</span> 
                     podes consultar tu orden con el siguiente numero de indentificacion 
                    <span style="color: #F48982">${order_id}</span> 
                </p>
                <p  style="color: #FFF; text-align:center">
                Tu orden estara lista en aproximadamente 30 minutos
            </p>
            <p  style="color: #FFF; text-align:center">
           
               Precio Total: 
                <span style="color: #F48982">${price}</span> 
            </p>
      
            </td>
        </tr>
        <tr bgcolor="#FFF">
            <td style="text-align:center">
                <p style="color: #F48982">¡La Mejor Pizza de Costa Rica!</p>
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