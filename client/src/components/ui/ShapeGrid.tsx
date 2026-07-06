// ShapeGrid.tsx — Full fixed version
// Fixes: hover (window-level mouse), vignette configurable, TS useEffect type, no black screen

import React, { useRef, useEffect } from "react";

type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern;

interface GridOffset {
  x: number;
  y: number;
}

interface ShapeGridProps {
  direction?: "diagonal" | "up" | "right" | "down" | "left";
  speed?: number;
  borderColor?: CanvasStrokeStyle;
  squareSize?: number;
  hoverFillColor?: CanvasStrokeStyle;
  shape?: "square" | "hexagon" | "circle" | "triangle";
  hoverTrailAmount?: number;
  /** Color of the radial vignette at the canvas edges. Default: transparent (no vignette). */
  vignetteColor?: string;
  /** Opacity of the vignette (0–1). Default: 0.85 */
  vignetteOpacity?: number;
}

const ShapeGrid: React.FC<ShapeGridProps> = ({
  direction = "right",
  speed = 1,
  borderColor = "#999",
  squareSize = 40,
  hoverFillColor = "#222",
  shape = "square",
  hoverTrailAmount = 0,
  vignetteColor = "transparent",
  vignetteOpacity = 0.85,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const gridOffset = useRef<GridOffset>({ x: 0, y: 0 });
  const hoveredSquareRef = useRef<GridOffset | null>(null);
  const trailCells = useRef<GridOffset[]>([]);
  const cellOpacities = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isHex = shape === "hexagon";
    const isTri = shape === "triangle";
    const hexHoriz = squareSize * 1.5;
    const hexVert = squareSize * Math.sqrt(3);

    // ─── Resize ─────────────────────────────────────────────────────────────
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // ─── Shape drawers ───────────────────────────────────────────────────────
    const drawHex = (cx: number, cy: number, size: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const vx = cx + size * Math.cos(angle);
        const vy = cy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();
    };

    const drawCircle = (cx: number, cy: number, size: number) => {
      ctx.beginPath();
      ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
      ctx.closePath();
    };

    const drawTriangle = (
      cx: number,
      cy: number,
      size: number,
      flip: boolean
    ) => {
      ctx.beginPath();
      if (flip) {
        ctx.moveTo(cx, cy + size / 2);
        ctx.lineTo(cx + size / 2, cy - size / 2);
        ctx.lineTo(cx - size / 2, cy - size / 2);
      } else {
        ctx.moveTo(cx, cy - size / 2);
        ctx.lineTo(cx + size / 2, cy + size / 2);
        ctx.lineTo(cx - size / 2, cy + size / 2);
      }
      ctx.closePath();
    };

    // ─── Grid renderer ───────────────────────────────────────────────────────
    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isHex) {
        const colShift = Math.floor(gridOffset.current.x / hexHoriz);
        const offsetX =
          ((gridOffset.current.x % hexHoriz) + hexHoriz) % hexHoriz;
        const offsetY =
          ((gridOffset.current.y % hexVert) + hexVert) % hexVert;

        const cols = Math.ceil(canvas.width / hexHoriz) + 3;
        const rows = Math.ceil(canvas.height / hexVert) + 3;

        for (let col = -2; col < cols; col++) {
          for (let row = -2; row < rows; row++) {
            const cx = col * hexHoriz + offsetX;
            const cy =
              row * hexVert +
              ((col + colShift) % 2 !== 0 ? hexVert / 2 : 0) +
              offsetY;
            const cellKey = `${col},${row}`;
            const alpha = cellOpacities.current.get(cellKey);

            if (alpha) {
              ctx.globalAlpha = alpha;
              drawHex(cx, cy, squareSize);
              ctx.fillStyle = hoverFillColor as string;
              ctx.fill();
              ctx.globalAlpha = 1;
            }

            drawHex(cx, cy, squareSize);
            ctx.strokeStyle = borderColor as string;
            ctx.stroke();
          }
        }
      } else if (isTri) {
        const halfW = squareSize / 2;
        const colShift = Math.floor(gridOffset.current.x / halfW);
        const rowShift = Math.floor(gridOffset.current.y / squareSize);
        const offsetX = ((gridOffset.current.x % halfW) + halfW) % halfW;
        const offsetY =
          ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

        const cols = Math.ceil(canvas.width / halfW) + 4;
        const rows = Math.ceil(canvas.height / squareSize) + 4;

        for (let col = -2; col < cols; col++) {
          for (let row = -2; row < rows; row++) {
            const cx = col * halfW + offsetX;
            const cy = row * squareSize + squareSize / 2 + offsetY;
            const flip =
              ((col + colShift + row + rowShift) % 2 + 2) % 2 !== 0;
            const cellKey = `${col},${row}`;
            const alpha = cellOpacities.current.get(cellKey);

            if (alpha) {
              ctx.globalAlpha = alpha;
              drawTriangle(cx, cy, squareSize, flip);
              ctx.fillStyle = hoverFillColor as string;
              ctx.fill();
              ctx.globalAlpha = 1;
            }

            drawTriangle(cx, cy, squareSize, flip);
            ctx.strokeStyle = borderColor as string;
            ctx.stroke();
          }
        }
      } else if (shape === "circle") {
        const offsetX =
          ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
        const offsetY =
          ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

        const cols = Math.ceil(canvas.width / squareSize) + 3;
        const rows = Math.ceil(canvas.height / squareSize) + 3;

        for (let col = -2; col < cols; col++) {
          for (let row = -2; row < rows; row++) {
            const cx = col * squareSize + squareSize / 2 + offsetX;
            const cy = row * squareSize + squareSize / 2 + offsetY;
            const cellKey = `${col},${row}`;
            const alpha = cellOpacities.current.get(cellKey);

            if (alpha) {
              ctx.globalAlpha = alpha;
              drawCircle(cx, cy, squareSize);
              ctx.fillStyle = hoverFillColor as string;
              ctx.fill();
              ctx.globalAlpha = 1;
            }

            drawCircle(cx, cy, squareSize);
            ctx.strokeStyle = borderColor as string;
            ctx.stroke();
          }
        }
      } else {
        // square
        const offsetX =
          ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
        const offsetY =
          ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

        const cols = Math.ceil(canvas.width / squareSize) + 3;
        const rows = Math.ceil(canvas.height / squareSize) + 3;

        for (let col = -2; col < cols; col++) {
          for (let row = -2; row < rows; row++) {
            const sx = col * squareSize + offsetX;
            const sy = row * squareSize + offsetY;
            const cellKey = `${col},${row}`;
            const alpha = cellOpacities.current.get(cellKey);

            if (alpha) {
              ctx.globalAlpha = alpha;
              ctx.fillStyle = hoverFillColor as string;
              ctx.fillRect(sx, sy, squareSize, squareSize);
              ctx.globalAlpha = 1;
            }

            ctx.strokeStyle = borderColor as string;
            ctx.strokeRect(sx, sy, squareSize, squareSize);
          }
        }
      }

      // ── Vignette (configurable, defaults to none) ───────────────────────
      if (vignetteColor !== "transparent" && vignetteOpacity > 0) {
        const gradient = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
        );
        gradient.addColorStop(0, "rgba(0,0,0,0)");
        gradient.addColorStop(1, vignetteColor);
        ctx.globalAlpha = vignetteOpacity;
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
      }
    };

    // ─── Animation tick ──────────────────────────────────────────────────────
    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      const wrapX = isHex ? hexHoriz * 2 : squareSize;
      const wrapY = isHex ? hexVert : isTri ? squareSize * 2 : squareSize;

      switch (direction) {
        case "right":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + wrapX) % wrapX;
          break;
        case "left":
          gridOffset.current.x =
            (gridOffset.current.x + effectiveSpeed + wrapX) % wrapX;
          break;
        case "up":
          gridOffset.current.y =
            (gridOffset.current.y + effectiveSpeed + wrapY) % wrapY;
          break;
        case "down":
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + wrapY) % wrapY;
          break;
        case "diagonal":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + wrapX) % wrapX;
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + wrapY) % wrapY;
          break;
      }

      updateCellOpacities();
      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    // ─── Cell opacity lerp ───────────────────────────────────────────────────
    const updateCellOpacities = () => {
      const targets = new Map<string, number>();

      if (hoveredSquareRef.current) {
        targets.set(
          `${hoveredSquareRef.current.x},${hoveredSquareRef.current.y}`,
          1
        );
      }

      if (hoverTrailAmount > 0) {
        for (let i = 0; i < trailCells.current.length; i++) {
          const t = trailCells.current[i];
          const key = `${t.x},${t.y}`;
          if (!targets.has(key)) {
            targets.set(
              key,
              (trailCells.current.length - i) /
                (trailCells.current.length + 1)
            );
          }
        }
      }

      for (const [key] of targets) {
        if (!cellOpacities.current.has(key)) {
          cellOpacities.current.set(key, 0);
        }
      }

      for (const [key, opacity] of cellOpacities.current) {
        const target = targets.get(key) ?? 0;
        const next = opacity + (target - opacity) * 0.15;
        if (next < 0.005) {
          cellOpacities.current.delete(key);
        } else {
          cellOpacities.current.set(key, next);
        }
      }
    };

    // ─── Mouse handling (window-level so content layers don't block it) ──────
    const getHoveredCell = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = clientX - rect.left;
      const mouseY = clientY - rect.top;

      if (isHex) {
        const colShift = Math.floor(gridOffset.current.x / hexHoriz);
        const offsetX =
          ((gridOffset.current.x % hexHoriz) + hexHoriz) % hexHoriz;
        const offsetY =
          ((gridOffset.current.y % hexVert) + hexVert) % hexVert;
        const col = Math.round((mouseX - offsetX) / hexHoriz);
        const rowOffset = (col + colShift) % 2 !== 0 ? hexVert / 2 : 0;
        const row = Math.round((mouseY - offsetY - rowOffset) / hexVert);
        return { x: col, y: row };
      } else if (isTri) {
        const halfW = squareSize / 2;
        const offsetX = ((gridOffset.current.x % halfW) + halfW) % halfW;
        const offsetY =
          ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
        return {
          x: Math.round((mouseX - offsetX) / halfW),
          y: Math.floor((mouseY - offsetY) / squareSize),
        };
      } else {
        // square or circle
        const offsetX =
          ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
        const offsetY =
          ((gridOffset.current.y % squareSize) + squareSize) % squareSize;
        if (shape === "circle") {
          return {
            x: Math.round((mouseX - offsetX) / squareSize),
            y: Math.round((mouseY - offsetY) / squareSize),
          };
        }
        return {
          x: Math.floor((mouseX - offsetX) / squareSize),
          y: Math.floor((mouseY - offsetY) / squareSize),
        };
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const { x: col, y: row } = getHoveredCell(event.clientX, event.clientY);

      if (
        !hoveredSquareRef.current ||
        hoveredSquareRef.current.x !== col ||
        hoveredSquareRef.current.y !== row
      ) {
        if (hoveredSquareRef.current && hoverTrailAmount > 0) {
          trailCells.current.unshift({ ...hoveredSquareRef.current });
          if (trailCells.current.length > hoverTrailAmount) {
            trailCells.current.length = hoverTrailAmount;
          }
        }
        hoveredSquareRef.current = { x: col, y: row };
      }
    };

    const handleMouseLeave = () => {
      if (hoveredSquareRef.current && hoverTrailAmount > 0) {
        trailCells.current.unshift({ ...hoveredSquareRef.current });
        if (trailCells.current.length > hoverTrailAmount) {
          trailCells.current.length = hoverTrailAmount;
        }
      }
      hoveredSquareRef.current = null;
    };

    // KEY FIX: listen on window, not canvas — so content layers don't block events
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    requestRef.current = requestAnimationFrame(updateAnimation);

    // ─── Cleanup (always returned — fixes EffectCallback TS error) ───────────
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [
    direction,
    speed,
    borderColor,
    hoverFillColor,
    squareSize,
    shape,
    hoverTrailAmount,
    vignetteColor,
    vignetteOpacity,
  ]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100%", height: "100%", border: "none" }}
    />
  );
};

export default ShapeGrid;