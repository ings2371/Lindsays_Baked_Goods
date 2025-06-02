'use client'
import { useState } from 'react';
import styles from '../components/formStyles.module.css'
import { useRouter } from 'next/navigation'
export default function Contact() {

    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [City, setCity] = useState("")
    const [Email, setEmail] = useState("")
    const [Comments, setComments] = useState("")

    const router = useRouter()

    const handleSubmit = async (e) => {
        console.log({FirstName, LastName, City, Email, Comments})

        try {
            const res = await fetch("http://localhost:3000/api/contact", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({FirstName, LastName, City, Email, Comments})
            })
            if (res.ok) {
                router.push('/')
            } else {
                throw new Error('Failed to send comment')
            }
        } catch (error) {
            console.log(error)

        }
        
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h1 style={{ padding: '1rem', fontSize: '24px' }}>Contact us</h1>

            <form onSubmit={ handleSubmit }>
                <p>Have any questions? Message us below.</p>
                <br/>
                <p>First Name:</p>
                <label htmlFor="First_Name" className="sr-only">First Name</label>
                <input
                onChange={(e) => setFirstName(e.target.value)}
                value = { FirstName }
                type="text" id="First_Name" className={styles.input} required autoFocus />

                <p>Last Name:</p>
                <label htmlFor="Last_Name" className="sr-only">Last Name</label>
                <input
                onChange={(e) => setLastName(e.target.value)}
                value = { LastName }
                type="text" id="Last_Name" className={styles.input} required />

                <p>City:</p>
                <label htmlFor="City" className="sr-only">City</label>
                <input
                onChange={(e) => setCity(e.target.value)}
                value = { City }
                type="text" id="City" className={styles.input} />

                <p>Email Address:</p>
                <label htmlFor="Email_Address" className="sr-only">Email Address</label>
                <input
                onChange={(e) => setEmail(e.target.value)}
                value = { Email }
                type="email" id="Email_Address" className={styles.input} required />

                <p>Comments/Questions:</p>
                <label htmlFor="Comments" className="sr-only">Comments/Questions</label>
                <textarea
                onChange={(e) => setComments(e.target.value)}
                value = { Comments }
                type="text" id="Comments" className={styles.input} required />
                <br/>
                <button className={styles.button} type="submit">Submit</button>
            </form>
        </div>
    )
}