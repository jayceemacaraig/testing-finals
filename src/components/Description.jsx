import React, { useState } from 'eslint-plugin-react-hooks'
import PlaceList from './PlaceList'

const Description = ({setPlanner, planner}) => {
    return (
        <div className="flex flex-col gap-y-5 pt-10 w-full h-screen justify-items-center overflow-auto">
            {/* {coords.map((e) => {
            let index = coords.indexOf(e);
            return (
              <div
                className="w-40 h-40 border-2 rounded-xl bg-amber-50 text-center content-center"
                key={index}
                onClick={() => {
                }}
              >
                Route {index + 1}
              </div>
            );
          })} */}

            <PlaceList setPlanner={setPlanner} planner={planner}/>

            <button onClick={() => console.log(planner)} className="p-5 border-2 fixed bottom-20 border-blue-500 bg-blue-200 w-md self-center rounded-xl">Start Travel</button>
        </div>
    )
}

export default Description
