import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



import { RefObject } from "react";





export const handleDownload = (svgRef: RefObject<SVGSVGElement>) => {
  if(svgRef.current === null) return
  const svgData = svgRef.current.outerHTML;
  const svgBlob = new Blob([svgData], {
    type: "image/svg+xml;charset=utf-8",
  });
  const svgUrl = URL.createObjectURL(svgBlob);
  const downloadLink = document.createElement("a");
  downloadLink.href = svgUrl;
  downloadLink.download = "dot_filled_map.svg";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

export const handlePNGDownload = (svgRef: RefObject<SVGSVGElement>, backgroundColor: string | CanvasGradient | CanvasPattern) => {
  const svg = svgRef.current;
  if (!svg) {
    return;
  }

  const serializer = new XMLSerializer();
  let svgStr = serializer.serializeToString(svg);

  svgStr = svgStr.replace(/&nbsp;/g, '&#160;');
  
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Failed to get canvas context.");
    return;
  }

  const img = new Image();
  img.onload = () => {

    // Set canvas size
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw SVG
    ctx.drawImage(img, 0, 0);

    // Check canvas content
    if (canvas.width === 0 || canvas.height === 0) {
      return;
    }

    canvas.toBlob((blob) => {
      if (!blob) {
        console.error("Failed to create blob from canvas.");
        return;
      }

      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "Map.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  img.onerror = (error) => {
    console.error("Failed to load SVG image.", error);
  };

  // Set a default width and height if not provided in SVG
  svg.setAttribute('width', '800'); // Adjust as necessary
  svg.setAttribute('height', '600'); // Adjust as necessary

  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr);
};