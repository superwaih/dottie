/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import * as turf from "@turf/turf";
import { geoEqualEarth, geoPath } from "d3-geo";
import { useStore } from "@/store/store";
import { world } from "@/lib/World";

export interface DotFilledMapProps {
  svgRef: React.RefObject<SVGSVGElement>;
}

// Define a type for your GeoJSON structure (can be more detailed if needed)
type GeoJson = {
  type: string;
  name: string;
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
  features: any[]; // This can be made more specific based on your features' structure
};

const DotFilledMap = ({ svgRef }: DotFilledMapProps) => {
  // Allow the state to be either null or a valid GeoJSON object
  const [geojsonData, setGeojsonData] = useState<GeoJson | null>(null);
  const selectedCountry = useStore((state) => state.country);
  const [dots, setDots] = useState([]);
  const size = useStore((state) => state.size);
  const padding = useStore((state) => state.padding);
  const containerRef = useRef(null);
  const [svgSize, setSvgSize] = useState({ width: 300, height: 300 });

  useEffect(() => {
    const fetchData = async () => {
      const data = world;
      setGeojsonData(data); // TypeScript will now accept this
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        // @ts-ignore
        const { width, height } = containerRef.current.getBoundingClientRect();
        setSvgSize({ width, height });
      }
    };

    handleResize(); // Initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    generateDots();
        // @ts-ignore
  }, [geojsonData, selectedCountry, svgSize]);

  const generateDots = () => {
        // @ts-ignore
    const { width, height } = svgSize;
        // @ts-ignore

    const feature = selectedCountry || turf.combine(world).features[0];
        // @ts-ignore
  
    const projection = geoEqualEarth().fitSize([width, height], feature);
    const path = geoPath().projection(projection);
        // @ts-ignore
    const bounds = path.bounds(feature);
    const [[x0, y0], [x1, y1]] = bounds;
    const dots = [];
    const spacing = Math.max(2, Math.floor(width / 160));
    for (let x = x0; x < x1; x += spacing) {
      for (let y = y0; y < y1; y += spacing) {
        // @ts-ignore
        const point = projection.invert([x, y]);
        if (point) {
          const [lon, lat] = point;
        // @ts-ignore
          if (turf.booleanPointInPolygon(turf.point([lon, lat]), feature)) {
            dots.push([x, y]);
          }
        }
      }
    }
        // @ts-ignore
    setDots(dots);
  };

  const backgroundColor = useStore((state) => state.backgroundColor);
  const color = useStore((state) => state.color);
  if (!geojsonData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        ref={containerRef}
        style={{
          background: backgroundColor,
          padding: `${padding}rem`,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="rounded-[20px] max-h-[70vh]"
      >
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <g>
            {dots.map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={Math.max(Number(size), svgSize.width / 800)}
                fill={color}
              />
            ))}
          </g>
        </svg>
      </div>
    </>
  );
};

export default DotFilledMap;
