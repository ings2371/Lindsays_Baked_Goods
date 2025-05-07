import Link from 'next/link'
const Item = ({Baked_Good}) => {

    return (
        <>
            {/* how the data displays*/}
            <Link href={`/baked-good-details/${Baked_Good._id}`}>
                <div key={Baked_Good._id} className="col-md-4">
                    <div className="box-shadow">
                        <img
                        src={`/Baked_Goods/${Baked_Good.Thumbnail}`}
                        style={{height: 428.33, width: 300, minWidth: 300}}
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