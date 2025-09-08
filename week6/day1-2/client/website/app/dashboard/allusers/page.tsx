import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function AllUsers (){
    return (
          <div className="pb-10 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-[#232321] text-2xl font-semibold">Dashboard</h2>
                            <Breadcrumb>
                             <BreadcrumbList>
                               <BreadcrumbItem>
                                 <BreadcrumbLink href="/dashboard" className="font-semibold text-black">Home</BreadcrumbLink>
                               </BreadcrumbItem>
                               <BreadcrumbSeparator className="text-black"/>
                               <BreadcrumbItem>
                                 <BreadcrumbPage className="font-semibold text-black">All Users</BreadcrumbPage>
                               </BreadcrumbItem>
                             </BreadcrumbList>
                            </Breadcrumb>
                        </div>
        
                        
              </div>

              <div className = 'w-full'>
                
              </div>
        </div>
    )
}