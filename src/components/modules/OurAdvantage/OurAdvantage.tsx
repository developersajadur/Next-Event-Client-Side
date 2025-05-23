import Image from "next/image"
import { Check } from "lucide-react"
import Title from "@/components/shared/Title"
export default function OurAdvantagesSection() {
  return (
    <section className="container w-full px-4 py-16 mx-auto xl:px-0 lg:mt-40">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 border-box">
    
        <div className="relative col-span-12 lg:col-span-5">
      
          <div className="overflow-hidden rounded-3xl ">
            <Image
              src='/images/img15.jpg'
              alt="Event planner with tablet"
              width={6000}
              height={6000}
              quality={100}
              className="object-cover h-[65dvh]     w-full rounded-3xl brightness-[0.7] contrast-[100%]
              satuaration-[120%] "
            />
          </div>

       
          <div className="bg-white md:rounded-3xl   md:max-w-md md:hidden sm:block lg:block lg:absolute  lg:bottom-0 shadow-md p-6 mt-6 border rounded-md  border-1 md:border-0 md:mt-0  lg:right-[5%]  lg:left-[12%] xs:right-[15%]  xs:left-[15%] ">
            <div className="space-y-8">
           
              <div className="flex gap-4 ">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
                    <Check className="w-10 h-5 text-[#1E3A8A]" />
                  </div>
                </div>
               
                <div>
                  <h3 className="mb-2 text-lg racking-wide text-transparent  drop-shadow-sm bg-gradient-to-r from-[#1E3A8A] via-[#3B82F6] to-[#1E293B] bg-clip-text font-bold">Experienced Professionals</h3>
                  <p className="text-gray-600">
                    Our team of certified event specialists has successfully managed over 500 events across diverse
                    industries.
                  </p>
                </div>
              </div>

            <hr className="border-gray-200 " />
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
                    <Check className="w-10 h-5 text-[#1E3A8A]" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-lg racking-wide text-transparent  drop-shadow-sm bg-gradient-to-r from-[#1E3A8A] via-[#3B82F6] to-[#1E293B] bg-clip-text font-bold">Clear And Upfront Costs</h3>
                  <p className="text-gray-600">
                    We provide comprehensive pricing breakdowns with no hidden charges, ensuring budget predictability.
                  </p>
                </div>
              </div>
            <hr className="border-gray-200 " />
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
                    <Check className="w-10 h-5 text-[#1E3A8A]" />
                  </div>
                </div>
                <div>
                <h3 className="mb-2 text-lg tracking-wide text-transparent drop-shadow-sm bg-gradient-to-r from-[#1E3A8A] via-[#3B82F6] to-[#1E293B] bg-clip-text font-bold">
 Every Step of the Way
</h3>
<p className="text-gray-600">
  From concept to execution, we handle all aspects of your event with precision and care.
</p>

                </div>
              </div>
            </div>
          </div>
        </div>

       
        <div className="col-span-12 space-y-8 lg:col-span-7 lg:mt-20">
          <div className="space-y-4">
            <div className="inline-flex items-center px-3 py-1 text-sm font-medium text-[#3B82F6] rounded-full">
              <div className="rounded-full px-3 py-1 bg-[#1E3A8A] text-white">@  OUR ADVANTAGES</div>
            
            </div>
            <Title title=' Highlighting Reasons To Select Our Services'></Title>
            <p className="text-gray-600 text-md">
            We stand out by delivering top-quality service, creative ideas, and a personal touch. Whether it’s a cozy get-together or a grand celebration, we plan every event with care, passion, and attention to detail.

From concept to execution, our team ensures every element is tailored to your needs. We listen, we collaborate, and we create experiences that feel uniquely yours. Your satisfaction is our success — and we don’t stop until everything feels just right.
            </p>
          </div>

         
          <div className="mt-8 overflow-hidden rounded-3xl">
            <Image
              src='/images/img15.jpg'
              alt="Event professionals in venue"
              width={6000}
              height={4000}
              className="object-cover w-full rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
