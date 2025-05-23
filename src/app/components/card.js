import Link from 'next/link'
const Item = ({Baked_Good}) => {

    return (
        <>
            {/* how the data displays*/}
            <Link href={`/baked-good-details/${Baked_Good._id}`}>
                <div key={Baked_Good._id} className="flex items-center justify-center p-0 col-md-4">
                    <div className="object-right box-shadow">
                        <img
                        src={`/Baked_Goods/${Baked_Good.Thumbnail}`}
                        className='w-18.5 h-26.5 md:h-53 md:w-37 lg:h-80 lg:w-56 lg:min-w-56'
                        />

                        <p style={{textAlign: "center" }} className='w-18.5 md:w-37 lg:w-56 text-wrap text-sm md:text-lg lg:text-2xl' >
                            {Baked_Good.Baked_Name} <br/>
                            {Baked_Good.Different_varients[0].Prices[0].Cost}
                            
                        </p>
                    </div>
                </div>
            </Link>
        
        
        
        
        </>
    )
}
export default Item