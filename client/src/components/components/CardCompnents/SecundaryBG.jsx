import * as React from "react"
const SecundaryBG = ({fill="rgba(222,222,222,0.8"}) => (
    <svg
        className="secundary-bg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 48"
    >
        <defs>
            <filter
                id="a"
                width={1.145}
                height={1.145}
                x={-0.072}
                y={-0.072}
                colorInterpolationFilters="sRGB"
            >
                <feGaussianBlur stdDeviation={1.27} />
            </filter>
        </defs>
        <circle
            cx={589.03}
            cy={189.34}
            r={21.473}
            fill={fill}
            fillOpacity={0.78}
            stroke="#000"
            strokeWidth={0.124}
            filter="url(#a)"
            style={{
                mixBlendMode: "normal",
            }}
            transform="matrix(.64851 0 0 .97227 -365.99 -160.19)"
        />
    </svg>
)
export default SecundaryBG