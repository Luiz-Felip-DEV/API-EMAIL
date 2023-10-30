import 'dotenv/config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SERVER,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
});

class EmailController {

    async email (req, res)
    {
        const email   = req.body.email;
        const name = req.body.name;

        if (!email) {
            return res.status(400).json({
                    error: true,
                    msgUser: "O parâmetro to é obrigatorio!",
                    msgOriginal: "O parâmetro to é obrigatorio!"
            });
        }

        if (!name) {
            return res.status(400).json({
                error: true,
                msgUser: "O parâmetro name é obrigatorio!",
                msgOriginal: "O parâmetro name é obrigatorio!"
            });
        }

        try {
                
            transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: "Formulario de Ajuda - ODONTO",
                text: `Obrigado por enviar o formulario de ajuda, SR(A) <strong>${name}</strong>, Daqui alguns instantes você receberá um retorno!`,
                html: `Obrigado por enviar o formulario de ajuda, SR(A) <strong>${name}</strong>, Daqui alguns instantes você receberá um retorno!`,
            });  

            return res.status(200).json({
                error: false,
                msgUser: "Email enviado com Sucesso!",
                msgOriginal: "Email enviado com Sucesso!"
            })

            
        } catch(error) {
            console.log(error);
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao enviar Email, Por Favor tente novamente!",
                msgOriginal: error
            })
        }
    }

    async emailCodigo(req,res) 
    {
        const email   = req.body.email;

        if (!email) {
            return res.status(400).json({
                error: true,
                msgUser: "O parâmetro email é obrigatorio!",
                msgOriginal: "O parâmetro email é obrigatorio!"
            });
        }
        try {
            const numeroAleatorio = Math.floor(100000 + Math.random() * 900000);

            transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: "Código - ODONTO",
                text: `Seu codigo para resetar a senha é: <strong> ${numeroAleatorio}</strong>`,
                html: `Seu codigo para resetar a senha é: <strong> ${numeroAleatorio}</strong>`,
            });  

            return res.status(200).json({
                error: false,
                msgUser: "Codigo enviado com Sucesso!",
                msgOriginal: "Codigo enviado com Sucesso!",
                codigo: numeroAleatorio
            })

            
        } catch(error) {
            console.log(error)
            return res.status(400).json({
                error: true,
                msgUser: "Erro ao enviar Codigo, Por Favor tente novamente!",
                msgOriginal: error
            })
        }
    }
}

export default new EmailController();