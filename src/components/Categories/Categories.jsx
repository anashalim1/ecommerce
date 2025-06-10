import useFetch from "../../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export default function Categories() {
  const { data, isError, isLoading } = useQuery({
    queryKey: "Categories", // unique key for the query
    queryFn: getCategories, // function to fetch data
  });
  console.log("recent Categories", data);

  async function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  return <div>categories</div>;
}
