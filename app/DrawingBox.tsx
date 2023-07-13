"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/app/Button";

type PredictedNumAndConfidence = {
  prediction: number;
  confidence: number;
};

export default function DrawingBox() {
  const [predictedNumAndConfidence, setPredictedNumAndConfidence] =
    useState<PredictedNumAndConfidence | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.strokeStyle = "black";
    context.lineWidth = 40;
    context.lineCap = "round";
    context.lineJoin = "round";

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

    canvas.addEventListener("mousedown", (e) => {
      startDrawing(e);
      draw(e);
    });
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", (e) => {
        startDrawing(e);
        draw(e);
      });
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

  async function submitCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const image = canvas.toDataURL("image/png");
    const response = await fetch("http://127.0.0.1:5000/api/receive_image", {
      method: "POST",
      body: image,
      cache: "no-store",
    });
    const responseJson: PredictedNumAndConfidence = await response.json();
    responseJson.confidence = parseFloat(
      (responseJson.confidence * 100).toFixed(2),
    );
    setPredictedNumAndConfidence(responseJson);
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        width={450}
        height={450}
        className="border-4 border-gray-700 bg-white m-5 rounded-md"
      />
      {predictedNumAndConfidence && (
        <>
          <p>Predicted number: {predictedNumAndConfidence.prediction}</p>
          <p className="mb-5">
            Confidence: {predictedNumAndConfidence.confidence + "%"}
          </p>
        </>
      )}
      <div>
        <Button onClick={clearCanvas}>Clear</Button>
        <Button onClick={submitCanvas}>Submit</Button>
      </div>
    </>
  );
}
