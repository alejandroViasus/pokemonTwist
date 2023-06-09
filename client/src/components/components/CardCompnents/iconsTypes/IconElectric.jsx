import * as React from "react"
const IconElectric = ({fill}) => (

    <svg
        className="icon-type"
        xmlns="http://www.w3.org/2000/svg"
        width="25mm"
        height="25mm"
        viewBox="0 0 25 25"
        fill={fill}

    >
        <path
            d="M.524 23.745c.092-.19 1.889-2.211 3.994-4.491 2.104-2.28 3.913-4.311 4.02-4.514.145-.27-.623-.79-2.91-1.973l-3.102-1.604 3.578-1.668c1.968-.918 6.922-3.25 11.01-5.182 4.089-1.933 7.413-3.381 7.387-3.22-.025.163-1.777 2.17-3.892 4.462s-3.933 4.332-4.04 4.535c-.144.269.593.775 2.762 1.896 1.626.841 2.918 1.602 2.872 1.692-.063.121-17.315 8.356-21.249 10.141-.345.157-.526.126-.43-.074z"
            style={{
                fill:{fill},
                fillOpacity: 1,
                stroke: "none",
                strokeWidth: 0.906816,
                strokeOpacity: 1,
            }}
        />
    </svg>
)
export default IconElectric
