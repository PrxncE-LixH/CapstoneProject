import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../Components/Card";
import useSWR from "swr";
import { useSelector } from "react-redux";
const fetcher = (url) => axios.get(url).then((res) => res.data);

function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const value = useSelector((state) => state.user.token);
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  async function getData() {
    const data = await axios.get(url);

    if (data) {
      setResult(data.data);
    }
  }

  // useEffect(()=>

  const handleSumbit = (e) => {
    e.preventDefault();
    getData();
    console.log(value)
  };

  return (
    <div className="h-screen w-screen bg-pink-400">
      <form className="pt-4 w-full flex px-20" onSubmit={handleSumbit}>
        <input
          type="text"
          placeholder="Search defination of a Word"
          className="w-full rounded-full px-6"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="border p-3  text-black bg-pink-100">
          Enter
        </button>
      </form>
      <div className="h-full w-full">
        {result && (
          <div className="shadow p-5 mx-20 bg-pink-50 rounded-lg mt-20">
            <p className="text-lg">{result[0].word}</p>
            <p className="pl-5">
              {result[0].meanings[0].definitions[0].definition}
            </p>
          </div>
        )}
      </div>
      <div dangerouslySetInnerHTML={{ __html: query }} />
    </div>
  );
}

export default Home;
