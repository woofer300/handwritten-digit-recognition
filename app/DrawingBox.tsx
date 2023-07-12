"use client";

import { useEffect, useRef } from "react";
import Button from "@/app/Button";

export default function DrawingBox() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.lineWidth = 20;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const startDrawing = (e: MouseEvent) => {
      isDrawing = true;
      [lastX, lastY] = [
        e.clientX - canvas.offsetLeft,
        e.clientY - canvas.offsetTop,
      ];
    };

    const draw = (e: MouseEvent) => {
      if (!isDrawing) return;
      context.beginPath();
      context.moveTo(lastX, lastY);
      const currentX = e.clientX - canvas.offsetLeft;
      const currentY = e.clientY - canvas.offsetTop;
      context.lineTo(currentX, currentY);
      context.stroke();
      [lastX, lastY] = [currentX, currentY];
    };

    const stopDrawing = () => {
      isDrawing = false;
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, []);

  function clearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        width={450}
        height={450}
        className="border-4 border-gray-700 bg-white m-5 rounded-md"
      />
      <div>
        <Button onClick={clearCanvas}>Clear</Button>
        <Button onClick={clearCanvas}>Submit</Button>
      </div>
    </>
  );
}
