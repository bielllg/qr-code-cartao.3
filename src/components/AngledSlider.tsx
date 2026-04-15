import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, animate, Variants } from "framer-motion";
import { cn } from "../utils/cn";

interface AngledSliderProps {
    /**
     * Array of image objects or URLs
     */
    items: {
        id: string | number;
        url?: string;
        emoji?: string | React.ReactNode;
        alt?: string;
        title?: string;
        description?: string;
    }[];
    /**
     * Speed of auto-scroll (seconds for full loop). Higher is slower.
     * @default 20
     */
    speed?: number;
    /**
     * Direction of scroll
     * @default "left"
     */
    direction?: "left" | "right";
    /**
     * Height of the slider container
     * @default "400px"
     */
    containerHeight?: string;
    /**
     * Width of each card
     * @default "300px"
     */
    cardWidth?: string;
    /**
     * Gap between cards
     * @default "40px"
     */
    gap?: string;
    /**
     * Angle of the 3D skew/rotation
     * @default 20
     */
    angle?: number;
    /**
     * Scale on hover
     * @default 1.05
     */
    hoverScale?: number;
    className?: string;
}

const cardVariants: Variants = {
    offHover: (angle: number) => ({
        rotateY: angle,
        z: 60,
        opacity: 0.8,
        scale: 1,
        zIndex: 30,
        transition: {
            type: "spring",
            mass: 3,
            stiffness: 400,
            damping: 50
        }
    }),
    onHover: (hoverScale: number) => ({
        rotateY: 0,
        z: 120,
        opacity: 1,
        scale: hoverScale,
        zIndex: 50,
        transition: {
            type: "spring",
            mass: 3,
            stiffness: 400,
            damping: 50
        }
    })
};

const AngledCard = ({
    item,
    angle,
    hoverScale,
    cardWidth
}: {
    item: any;
    angle: number;
    hoverScale: number;
    cardWidth: string;
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="relative flex-shrink-0 group overflow-visible cursor-pointer"
            style={{
                width: cardWidth,
                height: "100%",
                transformStyle: "preserve-3d",
            }}
            custom={isHovered ? hoverScale : angle}
            variants={cardVariants}
            initial="offHover"
            animate={isHovered ? "onHover" : "offHover"}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* The Service Card Content */}
            <div className="relative h-full w-full overflow-hidden border border-white/10 bg-zinc-900/50 
            min-h-[280px] sm:min-h-[350px] shadow-2xl rounded-[2rem] backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-center items-center text-center group-hover:border-purple-500/50 transition-colors duration-500">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Emoji / Icon */}
                <div className="text-6xl mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                    {item.emoji}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                    {item.title}
                </h3>

                {/* Description */}
                {item.description && (
                    <p className="text-white/50 text-base leading-relaxed italic">
                        {item.description}
                    </p>
                )}
            </div>
        </motion.div>
    );
};

export const AngledSlider = ({
    items,
    speed = 40,
    direction = "left",
    containerHeight = "400px",
    cardWidth = "300px",
    gap = "40px",
    angle = 20,
    hoverScale = 1.05,
    className,
}: AngledSliderProps) => {
    const [width, setWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    const duplicatedItems = React.useMemo(() => [...items, ...items, ...items], [items]);

    useEffect(() => {
        const calculateWidth = () => {
            const numWidth = parseInt(cardWidth?.toString().replace("px", "") || "300");
            const numGap = parseInt(gap?.toString().replace("px", "") || "40");

            if (!isNaN(numWidth) && !isNaN(numGap)) {
                const calculatedWidth = (numWidth + numGap) * items.length;
                setWidth(calculatedWidth);
            } else if (containerRef.current) {
                const scrollWidth = containerRef.current.scrollWidth;
                setWidth(scrollWidth / 3);
            }
        };

        calculateWidth();
        window.addEventListener('resize', calculateWidth);
        return () => window.removeEventListener('resize', calculateWidth);
    }, [items, cardWidth, gap]);

    useEffect(() => {
        if (width <= 0) return;

        const startX = direction === "left" ? 0 : -width;
        const endX = direction === "left" ? -width : 0;

        if (isHovered) return;

        const runAnimation = () => {
            const currentX = x.get();
            const totalDist = width;
            const dist = Math.abs(endX - currentX);
            const duration = speed * (dist / totalDist);

            const controls = animate(x, endX, {
                duration: duration,
                ease: "linear",
                onComplete: () => {
                    x.set(startX);
                    runAnimation();
                }
            });
            return controls;
        };

        const animation = runAnimation();

        return () => {
            animation.stop();
        };
    }, [width, speed, direction, isHovered, x]);

    return (
        <div
            className={cn(
                "relative w-full overflow-hidden bg-transparent py-10",
                className
            )}
            style={{
                height: containerHeight,
                perspective: "1000px",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                ref={containerRef}
                className="flex items-center h-full"
                style={{ x, gap, transformStyle: "preserve-3d" }}
            >
                {duplicatedItems.map((item, index) => (
                    <AngledCard
                        key={`${item.id}-${index}`}
                        item={item}
                        angle={angle}
                        hoverScale={hoverScale}
                        cardWidth={cardWidth}
                    />
                ))}
            </motion.div>
        </div>
    );
};
