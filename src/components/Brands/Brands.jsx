import useFetch from "../../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export default function Brands() {
  const { data, isError, isLoading } = useQuery({
    queryKey: "brands", // unique key for the query
    queryFn: getBrands, // function to fetch data
  });
  console.log("recent brands", data);

  async function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  console.log("brands", data);
  return <div>brands</div>;
}
