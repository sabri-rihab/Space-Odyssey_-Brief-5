
async function loadingDestinations(){
    try {
        const res = await fetch('destination.json');
        const destinations = await res.json();
        
        console.log(destinations);
    }catch (error){
        console.error("error loading data", error);
    }

}
loadingDestinations();