import { useState } from "react";

export default function StepByStepGuide({show, setShow}) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to TaraVel!",
      body: "Plan routes, discover new places and get turn‑by‑turn directions – all in one screen. Add place by searching or selecting place.",
      img: "/step1.png",
    },
    {
      title: "Search & Filter",
      body: "Use the search bar to find parks, cafés, landmarks… whatever you need.",
      img: "/step2.png",
    },
    {
      title: "Add to Planner",
      body: "Tap a place → “Add” to build your personalised travel plan.",
      img: "/step3.png",
    },
    {
      title: "Start your Trip",
      body: "Hit **Start Travel** and we’ll generate the best route automatically.",
      img: "/step4.png",
    },
  ];

  const closeGuide = () => {
    setStep(0);
    setShow(false);
  };
  const next = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  if (!show) return null;

  const { title, body, img } = steps[step];

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl flex flex-col gap-4">
        <button
          onClick={closeGuide}
          className="absolute top-3 right-3 text-xl font-bold text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>

        {img && (
          <img
            src={img}
            alt={title}
            className="h-100 w-full object-contain select-none pointer-events-none"
          />
        )}

        <h2 className="text-xl font-semibold text-center">{title}</h2>
        <p className="text-sm text-gray-600 text-center whitespace-pre-line">
          {body}
        </p>

        <div className="flex justify-center gap-2 my-2">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === step ? "bg-purple-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={back}
            disabled={step === 0}
            className="px-4 py-2 text-sm font-medium rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Back
          </button>

          {step === steps.length - 1 ? (
            <button
              onClick={closeGuide}
              className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700"
            >
              Get Started
            </button>
          ) : (
            <button
              onClick={next}
              className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
