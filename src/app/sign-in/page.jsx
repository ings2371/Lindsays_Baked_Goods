'use client'
import { useState } from 'react';
import styles from '../components/formStyles.module.css'
import { useRouter } from 'next/navigation'

export default function Sign() {

    const [UserName, setUserName] = useState("")
    const [Password, setPassword] = useState("")

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log({UserName, Password})

        try {
            const res = await fetch("http://localhost:3000/api/Signin", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({UserName, Password})
            })
            if (res.ok) {
                router.push('/')
            } else {
                throw new Error('Failed signin')
            }
        } catch (error) {
            console.log(error)

        }
        
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h1 style={{ padding: '1rem', fontSize: '24px' }}>Contact us</h1>

            <form onSubmit={ handleSubmit }>
                <br/>
                <p>UserName:</p>
                <label htmlFor="UserName" className="sr-only">UserName</label>
                <input
                onChange={(e) => setUserName(e.target.value)}
                value = { UserName }
                type="text" id="UserName" className={styles.input} required autoFocus />

                <p>Password:</p>
                <label htmlFor="Password" className="sr-only">Password</label>
                <input
                onChange={(e) => setPassword(e.target.value)}
                value = { Password }
                type="text" id="Password" className={styles.input} required />

               
                <br/>
                <button className={styles.button} type="submit">Submit</button>
            </form>
        </div>
    )
}