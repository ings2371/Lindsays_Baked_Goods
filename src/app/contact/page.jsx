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
                <label htmlFor="FirstName" className="sr-only">First Name</label>
                <input type="text" id="FirstName" className={styles.input} required autoFocus />

                <p>Last Name:</p>
                <label htmlFor="LastName" className="sr-only">Last Name</label>
                <input type="text" id="LastName" className={styles.input} required />

                <p>City:</p>
                <label htmlFor="City" className="sr-only">City</label>
                <input type="text" id="City" className={styles.input} />

                <p>Email Address:</p>
                <label htmlFor="Email" className="sr-only">Email Address</label>
                <input type="email" id="Email" className={styles.input} required />

                <p>Comments/Questions:</p>
                <label htmlFor="Comments" className="sr-only">Comments/Questions</label>
                <textarea type="text" id="Comments" className={styles.input} required />
                <br/>
                <button className={styles.button} type="submit">Submit</button>
            </form>
        </div>
    )
}
