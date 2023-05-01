import React, { useState } from "react";
import axios from "axios";
import Card from "../../Components/Card";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function Home() {
  const url = "https://randomuser.me/api/?results=10";
  const { data, error } = useSWR(url, fetcher);
  const [text, setText] = useState('')

  if(data){
   
  }else{
    console.log(error)
  }


  // ...

  return (
    <div>
      home
    
      {
          data ? (
            <div>
              <input type="text" />
              {/* <span dangerouslySetInnerHTML={{__html:text}}></span> */}
             {data.results.map(element=>{
              return(
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Card imageUrl={element.picture.large}
                email={element.email} 
                 name={`${element.name.title} ${element.name.first} ${element.name.last }`} 
                 />
                </div>
              )
             })}
            </div>
          ) :(<div>
            <h1>welocome</h1>
            </div>)
        }
    </div>
  );
}

export default Home;
