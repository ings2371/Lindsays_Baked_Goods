'use client'
import { useState } from 'react';
import styles from '../components/formStyles.module.css'
import { useRouter } from 'next/navigation'

export default function newItem(){

    const [Thumbnail, setThumbnail] = useState("");
    const [Baked_Name, setBaked_Name] = useState("")
    const [Item_Description, setItem_Description] = useState("")
    const [Different_varients, setDifferent_varients] = useState([{
        Variation_name: '',
        Prices: [{ Quantity: 0, Cost: 0 }],
        Different_Allergens: [{ Allergen_Name: '', Can_Remove: false }],
        Unit: ''
    }])
    const [Season, setSeason] = useState("")
    const [Catagory, setCatagory] = useState("")

    //adds a variant
    const handleAddVariant = () => {
        setDifferent_varients([...Different_varients, {
        Variation_name: '',
        Unit: '',
        Prices: [{ Quantity: 0, Cost: 0 }],
        Different_Allergens: [{ Allergen_Name: '', Can_Remove: false }],
    }])
    }

    //index is the position of the item in the array
    const handleChangeField = (index, field, value) => {
        const updated = [...Different_varients];
        updated[index][field] = value;
        setDifferent_varients(updated);
    };

    //handles price changes
    const handlePriceChange = (vIndex, pIndex, field, value) => {
        const updated = [...Different_varients];
        updated[vIndex].Prices[pIndex][field] = value;
        setDifferent_varients(updated);
    };

    //adds a price
    const addPrice = (vIndex) => {
        const updated = [...Different_varients];
        updated[vIndex].Prices.push({Quantity: "", Cost: "" })
        setDifferent_varients(updated)
    }

    //adds a allergy
    const addAllergy = (vIndex) => {
        const updated = [...Different_varients];
        updated[vIndex].Different_Allergens.push({Allergen_Name: "", Can_Remove: false })
        setDifferent_varients(updated)
    }

    //handles allergy changes
    const handleAllergenChange = (vIndex, pIndex, field, value) => {
        const updated = [...Different_varients];
        updated[vIndex].Different_Allergens[pIndex][field] = value;
        setDifferent_varients(updated);
    };

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newItem = {
            Thumbnail,
            Baked_Name,
            Item_Description,
            Different_varients,
            Season,
            Catagory
        };

        console.log({Baked_Name, Item_Description, Different_varients, Season, Catagory})

        try {
            const res = await fetch("http://localhost:3000/api/baked_good", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newItem),
            })
            if (res.ok) {
                router.push('/')
            } else {
                throw new Error('Failed upload')
            }
        } catch (error) {
            console.log(error)

        }
    }

    return (
        <div style={{ textAlign: "center" }}>
        <h1 style={{ padding: '1rem', fontSize: '24px' }}>add item</h1>

        <form onSubmit={ handleSubmit }>
            <br/>

            {/* baked goods name */}
            <p>baked good Name:</p>
            <label htmlFor="Baked_Good_Name" className="sr-only">Baked Good Name</label>
            <input
            onChange={(e) => setBaked_Name(e.target.value)}
            value = { Baked_Name }
            type="text" id="Baked_Good_Name" className={styles.input} required autoFocus />

            {/* this is the images */}
            <p>Thumbnail:</p>
            <label htmlFor="Thumbnail" className="sr-only">Thumbnail</label>
            <input
            onChange={(e) => setThumbnail(e.target.value)}
            value = { Thumbnail }
            type="text" id="Thumbnail" className={styles.input} required autoFocus />

            {/* the item description */}
            <p>Item Description:</p>
            <label htmlFor="City" className="sr-only">Item Description</label>
            <textarea
            onChange={(e) => setItem_Description(e.target.value)}
            value = { Item_Description }
            type="text" id="Item_Description" className={styles.input} />

            {/* the season of the baked good like christmas or non season */}
            <p>Season:</p>
            <label htmlFor="Season" className="sr-only">Season</label>
            <input
            onChange={(e) => setSeason(e.target.value)}
            value = { Season }
            type="text" id="Season" className={styles.input} required />

            {/* a catagory like cookie or cake */}
            <p>Catagory:</p>
            <label htmlFor="Catagory" className="sr-only">Catagory</label>
            <input
            onChange={(e) => setCatagory(e.target.value)}
            value = { Catagory }
            type="text" id="Catagory" className={styles.input} required />

            {/* the different variations */}
            {Different_varients.map((variant, index) => (
                <div key={index}>
                    <h3 className="text-lg font-bold">Variant {index + 1}</h3>

                    {/* variation name */}
                    <input
                        type="text"
                        placeholder="Variation Name"
                        value={variant.Variation_name}
                        onChange={(e) => handleChangeField(index, 'Variation_name', e.target.value)}
                        className="block border px-2 py-1 w-full"
                    />
                    <div>
                        {variant.Prices.map((price, aIndex) => (
                            <div key={aIndex}>
                                <h5 className="text-lg">Price {aIndex + 1}</h5>

                                <p>Quantity</p>
                                <input
                                    type="text"
                                    placeholder="Quantity"
                                    value={price.Quantity}
                                    onChange={(e) =>
                                        handlePriceChange(index, aIndex, 'Quantity', Number(e.target.value))
                                    }
                                    className="border px-2 py-1 w-full"
                                />
                                <p>Cost</p>
                                <input
                                    type="text"
                                    placeholder="Cost"
                                    value={price.Cost}
                                    onChange={(e) =>
                                        handlePriceChange(index, aIndex, 'Cost', Number(e.target.value))
                                    }
                                    className="border px-2 py-1 w-full"
                                />
                                
                                
                            </div>

                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => addPrice(index)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >add Price</button>

                    <div>
                        <h5>Allergies</h5>
                        {variant.Different_Allergens.map((allergen, aIndex) => (
                            <div key={aIndex}>
                                <input
                                    type="text"
                                    placeholder="Allergen Name"
                                    value={allergen.Allergen_Name}
                                    onChange={(e) =>
                                        handleAllergenChange(index, aIndex, 'Allergen_Name', e.target.value)
                                    }
                                    className="border px-2 py-1 w-full"
                                />
                                
                                
                            </div>

                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => addAllergy(index)}
                        className="bg-gray-500 text-white px-4 rounded"
                    >add Allergy</button>

                    {/* unit of messurement */}
                    <input
                        type="text"
                        placeholder="Unit"
                        value={variant.Unit}
                        onChange={(e) => handleChangeField(index, 'Unit', e.target.value)}
                        className="block border px-2 py-1 w-full"
                    />

                </div>
            ))}

            {/* adds another variation */}
                <button
                type="button"
                onClick={handleAddVariant}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Add Variant
            </button>

            <br/>
            <button className={styles.button} type="submit">Submit</button>
        </form>
    </div>
    )
}