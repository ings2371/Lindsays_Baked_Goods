'use server'
import { Resend } from 'resend';


//this only adds the order to a db and doesn't send them there receipt yet
export async function POST(request) {
    try{
        const {FirstName, LastName, City, Email, Comments} = await request.json();
        const resend = new Resend('re_RueTrXAi_6rTXBvhz1Tdh2bMsETwq1vp2');
        
        
        
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Month is 0-indexed
        const day = currentDate.getDate();
        const formattedDate = day + "/" + month + "/" + year
        console.log(formattedDate);

        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        const currentTime = hours + ":" + minutes + ":" + seconds
        
        const htmlContent = `
        <div>
            <h2>${FirstName} ${LastName} Comments/questions were,</h2>
            <p>${Comments}</p>
            <p>To respond back if they have any questions you can message them at ${Email}.</p>
        </div>
        `;
        
        
        
        
        var response = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'noahings16@gmail.com',
            subject: `Comment/Question ${FirstName} ${LastName} ${formattedDate} ${currentTime}`,
            html: htmlContent,
        });
        console.log("Resend Response:", response);

        return new Response(JSON.stringify({ success: true, response }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }


}