import Image from "next/image";
import Button from "@/app/Button";
import DrawingBox from "@/app/DrawingBox";

export default function Home() {
  return (
    <main className="flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold">Handwritten Digit Recognition</h1>
      <DrawingBox />
    </main>
  );
}
