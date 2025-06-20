import BakedGoodClientView from '@/app/components/BakedGoodClientView';

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const res = await fetch('http://localhost:3000/api/baked_good'); // Update this!
  const text = await res.text();

  try {
    const data = JSON.parse(text);
    return data.map(item => ({ BakedId: item._id }));
  } catch (e) {
    console.error('JSON parsing failed:', text);
    throw e;
  }
}


export default async function BakedGoodPage({ params }) {
    var id = await params
  const res = await fetch(`http://localhost:3000/api/baked_good/${id.BakedId}`, {
    cache: 'force-cache',
  });

  if (!res.ok) {
    return <div>Error loading baked good.</div>;
  }

  const result = await res.json();
  const BakedGood = result.baked;

  return (
        <div>
            <div className='w-100 w-[100vw] mdlg:w-[1px] md:w-[55vw] lg:min-w-160 max-w-250'>
                <div>
                    <div className='flex flex-row'>
                      <div className='w-24 min-w-24 h-26 md:h-53 md:w-48 md:min-w-48 lg:h-107 lg:w-97.5 lg:min-w-97 overflow-hidden'>
                        <img
                          src={`/Baked_Goods/${BakedGood.Thumbnail}`}
                          // style={{height: 350, width: 300}}
                          className='w-full h-full object-cover'
                        />
                      </div>
                        
                        <div>
                            <p className='p-5 md:text-[150%] lg:text-[200%]'>{BakedGood.Baked_Name}</p>
                            <p className='p-5'>{BakedGood.Item_Description}</p>
                        </div>
                        
                    </div>

            
          </div>
          <BakedGoodClientView BakedGood={BakedGood} />
        </div>
      </div>
  );
}
