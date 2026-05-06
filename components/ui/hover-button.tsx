"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface HoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  asChild?: boolean;
  href?: string;
}

const HoverButton = React.forwardRef<HTMLButtonElement, HoverButtonProps>(
  ({ className, children, asChild = false, href, ...props }, ref) => {
    const buttonRef = React.useRef<HTMLElement>(null);
    React.useImperativeHandle(
      ref,
      () => buttonRef.current as HTMLButtonElement,
    );

    const [isListening, setIsListening] = React.useState(false);
    const [circles, setCircles] = React.useState<
      Array<{
        id: number;
        x: number;
        y: number;
        color: string;
        fadeState: "in" | "out" | null;
      }>
    >([]);
    const lastAddedRef = React.useRef(0);

    const createCircle = React.useCallback((x: number, y: number) => {
      const buttonWidth = buttonRef.current?.offsetWidth || 0;
      const xPos = x / buttonWidth;
      const color = `linear-gradient(to right, #a0d9f8 ${xPos * 100}%, #3a5bbf ${xPos * 100}%)`;

      setCircles((prev) => [
        ...prev,
        { id: Date.now(), x, y, color, fadeState: null },
      ]);
    }, []);

    const handlePointerMove = React.useCallback(
      (event: React.PointerEvent<HTMLElement>) => {
        if (!isListening) return;

        const currentTime = Date.now();
        if (currentTime - lastAddedRef.current > 100) {
          lastAddedRef.current = currentTime;
          const rect = event.currentTarget.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          createCircle(x, y);
        }
      },
      [isListening, createCircle],
    );

    const handlePointerEnter = React.useCallback(() => {
      setIsListening(true);
    }, []);

    const handlePointerLeave = React.useCallback(() => {
      setIsListening(false);
    }, []);

    React.useEffect(() => {
      circles.forEach((circle) => {
        if (!circle.fadeState) {
          setTimeout(() => {
            setCircles((prev) =>
              prev.map((c) =>
                c.id === circle.id ? { ...c, fadeState: "in" } : c,
              ),
            );
          }, 0);

          setTimeout(() => {
            setCircles((prev) =>
              prev.map((c) =>
                c.id === circle.id ? { ...c, fadeState: "out" } : c,
              ),
            );
          }, 1000);

          setTimeout(() => {
            setCircles((prev) => prev.filter((c) => c.id !== circle.id));
          }, 2200);
        }
      });
    }, [circles]);

    const Comp = asChild ? Slot : href ? "a" : "button";
    const linkProps = href ? { href } : {};

    return (
      <Comp
        ref={buttonRef as React.Ref<HTMLButtonElement>}
        className={cn(
          "relative isolate inline-flex items-center justify-center shrink-0 px-8 py-3 rounded-3xl",
          "text-foreground font-medium text-base leading-6",
          "backdrop-blur-lg bg-[rgba(43,55,80,0.1)]",
          "cursor-pointer overflow-hidden",
          "before:content-[''] before:absolute before:inset-0",
          "before:rounded-[inherit] before:pointer-events-none",
          "before:z-1",
          "before:shadow-[inset_0_0_0_1px_rgba(170,202,255,0.2),inset_0_0_16px_0_rgba(170,202,255,0.1),inset_0_-3px_12px_0_rgba(170,202,255,0.15),0_1px_3px_0_rgba(0,0,0,0.50),0_4px_12px_0_rgba(0,0,0,0.45)]",
          "before:mix-blend-multiply before:transition-transform before:duration-300",
          "active:before:scale-[0.975]",
          className,
        )}
        onPointerMove={handlePointerMove as React.PointerEventHandler}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        {...linkProps}
        {...props}
      >
        {circles.map(({ id, x, y, color, fadeState }) => (
          <div
            key={id}
            className={cn(
              "absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full",
              "blur-lg pointer-events-none z-[-1] transition-opacity duration-300",
              fadeState === "in" && "opacity-75",
              fadeState === "out" && "opacity-0 duration-[1.2s]",
              !fadeState && "opacity-0",
            )}
            style={{
              left: x,
              top: y,
              background: color,
            }}
          />
        ))}
        <span className="relative z-[2] whitespace-nowrap pointer-events-none">
          {children}
        </span>
      </Comp>
    );
  },
);

HoverButton.displayName = "HoverButton";

export { HoverButton };
