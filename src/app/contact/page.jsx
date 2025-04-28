'use client'
export default function Contact() {

    return (
        <div style={{ textAlign: "center" }}>
            <h1 style={{ textAlign: "center" }}>Contact us</h1>

            <form className='form-signin'>
                <p>Have any questions? Message us below.</p>
                <br/>
                <p>First Name:</p>
                <label htmlFor="First_Name" className="sr-only">First Name</label>
                <input type="text" id="First_Name" className="form-control" required autoFocus />

                <p>Last Name:</p>
                <label htmlFor="Last_Name" className="sr-only">Last Name</label>
                <input type="text" id="Last_Name" className="form-control" required />

                <p>City:</p>
                <label htmlFor="City" className="sr-only">City</label>
                <input type="text" id="City" className="form-control" />

                <p>Email Address:</p>
                <label htmlFor="Email_Address" className="sr-only">Email Address</label>
                <input type="email" id="Email_Address" className="form-control" required />

                <p>Phone:</p>
                <label htmlFor="Phone" className="sr-only">Phone</label>
                <input type="tel" id="Phone" className="form-control" required />

                <p>Comments/Questions:</p>
                <label htmlFor="Comments" className="sr-only">Comments/Questions</label>
                <textarea type="text" id="Comments" className="form-control" required />

                <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
            </form>
        </div>
    )
}
