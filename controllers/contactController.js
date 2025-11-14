import sgMail from "@sendgrid/mail";
import ContactModel from '../models/contactmodel.js';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


export const sendEmail = async (req, res) => {
    try {
        const { name, email, number, message } = req.body;

        if (!name || !email || !number || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Save message to database
        await ContactModel.create({ name, email, number, message });

        // Send email
        const msg = {
            to: process.env.ADMIN_EMAIL,
            from: process.env.ADMIN_EMAIL,
            subject: "Nature Water Enquiry",
               html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
            <h2 style="color: #007BFF;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone Number:</strong> ${number}</p>
            <p><strong>Message:</strong></p>
            <p style="background-color: #f4f4f4; padding: 10px; border-radius: 5px;">${message}</p>
            <hr>
            <p style="font-size: 12px; color: #888;">This message was sent from your website contact form.</p>
            
             </div>
    `        }

        await sgMail.send(msg);

        return res.status(200).json({ success: true, message: "Email sent successfully" });

    } catch (error) {
        console.error("SendGrid Error:", error.response?.body || error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}
