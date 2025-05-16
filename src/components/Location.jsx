import PlaceList from "./PlaceList";
import Planner from "./Planner";

const Location = ({
  setPlanner,
  planner,
  start,
  filteredPlaces,
  map,
  fetchPlanner,
  reset,
  setForDescription,
  setActiveTab,
  setForDescriptionIdx,
  routeLayer
}) => {
  return (
    <div className="flex flex-col gap-y-5 pt-3 bg-white rounded-tr-4xl rounded-tl-4xl h-auto shadow-lg border-2 border-gray-300 w-full justify-items-center">
      {start ? (
        <Planner
          planner={planner}
          map={map}
          reset={reset}
          setForDescription={setForDescription}
          setForDescriptionIdx={setForDescriptionIdx}
          routeLayer={routeLayer}
        />
      ) : (
        <>
          <PlaceList
            setPlanner={setPlanner}
            planner={planner}
            filteredPlaces={filteredPlaces}
            map={map}
            fetchPlanner={fetchPlanner}
            setForDescription={setForDescription}
            setActiveTab={setActiveTab}
          />
        </>
      )}
    </div>
  );
};

export default Location;
