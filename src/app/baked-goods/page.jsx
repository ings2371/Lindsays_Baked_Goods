import Item from "@/app/components/card";

export default async function Page() {
  const res = await fetch("http://localhost:3000/api/baked_good", {
    // The 'force-cache' option ensures the data is cached and reused
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status}`);
  }

  const BakedGoods = await res.json();

  return (
    <div>
      <h1 className="text-center text-2xl">Baked goods</h1>
      {BakedGoods ? (
        <div>
          <div className="flex grid grid-cols-3 xl:grid-cols-4">
              {BakedGoods.map (Baked_Good => (
                  <div key={Baked_Good._id} style={{padding: "16.5px"}}>
                      <Item Baked_Good={Baked_Good} />
                  </div>            
              ))}
          </div>
      </div>
      ) : (
        <div>No data yet.</div>
      )} 
    </div>
  );
}
