#!/usr/bin/env node

const fs = require("fs");
const nodemailer = require("nodemailer");
const moment = require("moment");

let host = null;
let port = null;
let user = null;
let pass = null;
let from = null;
let to = null;
let subject = null;
let text = null;

console.log(`
          ███████╗███████╗███╗   ██╗██████╗     ███╗   ███╗ █████╗ ██╗██╗               
          ██╔════╝██╔════╝████╗  ██║██╔══██╗    ████╗ ████║██╔══██╗██║██║               
█████╗    ███████╗█████╗  ██╔██╗ ██║██║  ██║    ██╔████╔██║███████║██║██║         █████╗
╚════╝    ╚════██║██╔══╝  ██║╚██╗██║██║  ██║    ██║╚██╔╝██║██╔══██║██║██║         ╚════╝
          ███████║███████╗██║ ╚████║██████╔╝    ██║ ╚═╝ ██║██║  ██║██║███████╗          
          ╚══════╝╚══════╝╚═╝  ╚═══╝╚═════╝     ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚══════╝                   
`);

const showEnd = () => {
    console.log(`                                                                                        
█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗
╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝
    `);
}

for (let j = 0; j < process.argv.length; j++) {
    if (process.argv[j] === "-h" || process.argv[j] === "--host") {
        host = process.argv[j + 1]
    }
    if (process.argv[j] === "-po" || process.argv[j] === "--port") {
        port = process.argv[j + 1]
    }
    if (process.argv[j] === "-u" || process.argv[j] === "--user") {
        user = process.argv[j + 1]
    }
    if (process.argv[j] === "-pa" || process.argv[j] === "--pass") {
        pass = process.argv[j + 1]
    }
    if (process.argv[j] === "-f" || process.argv[j] === "--from") {
        from = process.argv[j + 1]
    }
    if (process.argv[j] === "-to" || process.argv[j] === "--to") {
        to = process.argv[j + 1]
    }
    if (process.argv[j] === "-s" || process.argv[j] === "--subject") {
        subject = process.argv[j + 1]
    }
    if (process.argv[j] === "-t" || process.argv[j] === "--text") {
        text = process.argv[j + 1]
    }
    // env file
    if (process.argv[j] === "-e" || process.argv[j] === "--env") {
        const envFile = process.argv[j + 1];
        const env = require("./"+envFile);
        host = env.host;
        port = env.port;
        user = env.user;
        pass = env.pass;
        from = env.from;
        to = env.to;
        subject = env.subject;
        text = env.text;
    }
}

// check if all values are set
if (host === null || port === null || user === null || pass === null || from === null || to === null || subject === null || text === null) {
    console.log("I recommend to use the env file");
    console.log("/* -------------------------------------------------------------------------- */")
    console.log("Usage: node send-mail-node.js -e <env file>");
    console.log("Usage: node send-mail-node.js -h <host> -po <port> -u <user> -pa <pass> -f <from> -to <to> -s <subject> -t <text>");
    console.log("/* -------------------------------------------------------------------------- */")
    console.log("COMMANDS")
    console.log("-h --host <host>");
    console.log("-po --port <port>");
    console.log("-u --user <user>");
    console.log("-pa --pass <pass>");
    console.log("-f --from <from>");
    console.log("-to --to <to>");
    console.log("-s --subject <subject>");
    console.log("-t --text <text>");
    console.log("-e --env <env.js>");
    showEnd();
    process.exit(1);
}

port = parseInt(port);



(async () => {
    try {
        let transporter = nodemailer.createTransport({
            host: host,
            port: port,
            secure: true, // true for 465, false for other ports
            auth: {
                user: user,
                pass: pass,
            },
        });

        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            text: text, // plain text body
            html: `<b>${text}</b>`, // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(`Error: ${error}`);
                showEnd();
                return;
            } else {
                console.log(`📫 Email sent to ${info.envelope.to}`);
                showEnd();
                return;
            }
        });

    } catch (error) {
        console.log(error);
        showEnd();
        return;
    }
})();