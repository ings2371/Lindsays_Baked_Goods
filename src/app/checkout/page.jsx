'use client'
export default function Checkout() {

    return (
        <div>
            <h1>Checkout</h1>

            <p>How to pay is to either E-transfer or with cash<br/> apon pick-up or drop off</p>

            <form>
                <p>Email Address:</p>
                <label htmlFor="Email_Address" className="sr-only">Email Address</label>
                <input type="email" id="Email_Address" required /> 

                <p>Name:</p>
                <label htmlFor="Full_Name" className="sr-only">full name</label>
                <input type="text" id="Full_Name" required autoFocus />

                <p>Date:</p>
                <label htmlFor="Date" className="sr-only">Date</label>
                <input type="date" id="Date" className="form-control"  required />
            </form>
        </div>
        
    )
}