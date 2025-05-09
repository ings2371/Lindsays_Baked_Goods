import Link from 'next/link'
const Item = ({Baked_Good}) => {

    return (
        <>
            {/* how the data displays*/}
            <Link href={`/baked-good-details/${Baked_Good._id}`}>
                <div key={Baked_Good._id} className="p-0 col-md-4">
                    <div className="box-shadow">
                        <img
                        src={`/Baked_Goods/${Baked_Good.Thumbnail}`}
                        className='w-18.5 h-26.5 md:h-53 md:w-37 lg:h-107 lg:w-75 lg:min-w-75'
                        />

                        <p style={{textAlign: "center", fontSize: 25 }}>
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