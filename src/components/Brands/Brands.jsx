import useFetch from "../../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Brand from "../Brand/Brand";
import Loader from "../Loader/Loader";

export default function Brands() {
  const { data, isError, isLoading } = useQuery({
    queryKey: "brands", // unique key for the query
    queryFn: getBrands, // function to fetch data
  });

  async function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  
  return (
    <>
      <div className="mx-auto text-center pt-20 pb-10">
        <p className="font-bold text-3xl text-gray-700">
         "We partner with the best brands in the market"
        </p>
      </div>
      <section className="pb-20">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <Loader />
            </div>
          ) : isError ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {isError}
            </div>
          ) : (
            <div className="row flex flex-wrap mx-6 ">
              {data.data.data.map((brand) => (
                <Brand key={brand._id} brand={brand}></Brand>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
