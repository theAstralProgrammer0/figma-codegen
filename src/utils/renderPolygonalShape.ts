import React from "react";
import { ParsedNode } from "../types";
import { figmaColorToRgba } from "./color";

interface PolygonalShapeProps {
  node: ParsedNode;
  type: "star" | "polygon";
}

export function renderPolygonalShape({ node, type }: PolygonalShapeProps) {
  const { width, height, fills, strokes, strokeWeight, vectorPaths } = node;

  if (!vectorPaths || vectorPaths.length === 0) {
    return null;
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {vectorPaths.map((path, index) => (
        <path
          key={index}
          d={path}
          fill={fills?.length ? figmaColorToRgba(fills[0].color) : "none"}
          stroke={strokes?.length ? figmaColorToRgba(strokes[0].color) : "none"}
          strokeWidth={strokeWeight || 0}
        />
      ))}
    </svg>
  );
}

