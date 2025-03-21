"use client";
import React, { useState } from "react";

function Page() {
  const [emoji, setEmoji] = useState("");
  const [language, setLanguage] = useState("english");
  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState("");

  async function handleClick() {
    try {
      setLoading(true);
      const res = await fetch("/api/Emojis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: emoji, language }),
      });
      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(`Error ${res.status}: ${errorResponse.msg}`);
      }
      const responseData = await res.json();
      setData(responseData.response);
    } catch (error) {
      console.error("Fetch error:", error.message);
      setData("Error fetching data. Try again!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col border h-screen p-10 items-center justify-center">
      <div className="flex items-center">
        <p>Language</p>
        <select
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 w-40 border rounded-2xl m-3 bg-blue-500"
        >
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
          <option value="pahadi(kumauni)">Pahadi</option>
          <option value="panjabi_in_English">Punjabi</option>
          <option value="garhwali">Garhwali</option>
        </select>
      </div>
      <input
        type="text"
        className="text-lg text-green-300 border-amber-100 border p-3 mb-3 rounded-full"
        placeholder="Enter emoji..."
        onChange={(e) => setEmoji(e.target.value)}
        value={emoji}
      />
      <button
        className="text-xl text-blue-300 border-green-500 border p-3 mb-3 rounded-lg hover:font-bold cursor-pointer"
        onClick={handleClick}
      >
        Check
      </button>
      {loading ? <p>Loading...</p> : <p>{Data}</p>}
    </div>
  );
}

export default Page;
