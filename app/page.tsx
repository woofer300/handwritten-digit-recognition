import Image from "next/image";
import ClearButton from "@/app/ClearButton";
import SubmitButton from "@/app/SubmitButton";

export default function Home() {
  return (
    <main className="flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold">Handwritten Digit Recognition</h1>
      <canvas
        width={450}
        height={450}
        className="border-4 border-gray-700 bg-white m-10 rounded-md"
      />
      <div>
        <ClearButton />
        <SubmitButton />
      </div>
    </main>
  );
}
