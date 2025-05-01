'use client'
import { POST } from '../api/Contact/route'
import { useState } from 'react';
import styles from './formStyles.module.css'
export default function Contact() {


    
    return (
        <div style={{ textAlign: "center" }}>
            <h1 style={{ padding: '1rem', fontSize: '24px' }}>Contact us</h1>

            <form action={ POST }>
                <p>Have any questions? Message us below.</p>
                <br/>
                <p>First Name:</p>
                <label htmlFor="First_Name" className="sr-only">First Name</label>
                <input type="text" id="First_Name" className={styles.input} required autoFocus />

                <p>Last Name:</p>
                <label htmlFor="Last_Name" className="sr-only">Last Name</label>
                <input type="text" id="Last_Name" className={styles.input} required />

                <p>City:</p>
                <label htmlFor="City" className="sr-only">City</label>
                <input type="text" id="City" className={styles.input} />

                <p>Email Address:</p>
                <label htmlFor="Email_Address" className="sr-only">Email Address</label>
                <input type="email" id="Email_Address" className={styles.input} required />

                <p>Comments/Questions:</p>
                <label htmlFor="Comments" className="sr-only">Comments/Questions</label>
                <textarea type="text" id="Comments" className={styles.input} required />
                <br/>
                <button className={styles.button} type="submit">Submit</button>
            </form>
        </div>
    )
}
