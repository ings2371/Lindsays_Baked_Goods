const Item = ({Baked_Good}) => {

    return (
        <>

            {/* how the data displays*/}
            <div key={Baked_Good._id} className="col-md-4">
            <div className="box-shadow">
                {/* <img 
                src={Baked_Good.thumbnail}
                style={{height: 428.33, width: 300}}
                /> */}
                <p style={{textAlign: "center", fontSize: 25 }}>
                    {Baked_Good.Baked_Name} <br/>
                    {/* {Baked_Good.Different_varients.Prices[0].Cost} */}
                    
                </p>
            </div>
        </div>
        
        
        
        
        </>
    )
}
export default Item