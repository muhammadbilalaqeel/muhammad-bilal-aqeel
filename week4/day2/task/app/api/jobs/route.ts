import { NextResponse } from "next/server";
import data from "@/data/data.json"
export async function GET(request : Request){

    let url = new URL(request.url);
    console.log(url)
    let tagsParam = url.searchParams.get('tags');
    console.log(tagsParam)
    let tags = tagsParam ? tagsParam.split(',') : [];
    console.log(tags)
    let filteredData = data;
    if(tags.length>0){
      filteredData = data.filter((job)=> tags.some((tag)=>job.languages.includes(tag)))
    }
    return NextResponse.json({
        data:filteredData,
        success:true,
        message: tags.length > 0 ? 'Filtered by tags' : "Fetched all jobs"
    })
}