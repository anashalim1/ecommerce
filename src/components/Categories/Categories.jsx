import useFetch from "../../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../Loader/Loader";
import Categorie from "../Categorie/categorie";
export default function Categories() {
  async function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data, isError, isLoading } = useQuery({
    queryKey: "Categories", // unique key for the query
    queryFn: getCategories, // function to fetch data
  });
  console.log("recent Categories", data);

  return (
    <>
      <div className="mx-auto text-center pt-20 pb-10">
        <p className="font-bold text-3xl text-gray-700">
          "You can shop from the best categories in the market"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7  m-6 bg-">
              {data &&
                data.data.data.map((categorie) => (
                  <Categorie key={categorie._id} categorie={categorie} />
                ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
