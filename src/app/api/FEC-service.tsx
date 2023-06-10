export const searchCandidates = async (candidate: string) => {

    try{
        const res = await fetch(`https://api.open.fec.gov/v1/candidates?api_key=${process.env.NEXT_PUBLIC_FEC_API_KEY}&name=${candidate}`);
        const jsonRes = await res.json();
        return jsonRes;
    }

    catch(e: any){
        return e;
    }  

}