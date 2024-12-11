// import React from "react";
// // import { BarChart, TooltipCallbackProps } from "@/components/BarChart";

// interface DataItem {
//   date: string;
//   revenue: number;
// }

// const data: DataItem[] = [
//   {
//     date: "Jan 23",
//     revenue: 2340,
//   },
//   {
//     date: "Feb 23",
//     revenue: 3110,
//   },
//   {
//     date: "Mar 23",
//     revenue: 4643,
//   },
//   {
//     date: "Apr 23",
//     revenue: 4650,
//   },
//   {
//     date: "May 23",
//     revenue: 3980,
//   },
//   {
//     date: "Jun 23",
//     revenue: 4702,
//   },
//   {
//     date: "Jul 23",
//     revenue: 5990,
//   },
//   {
//     date: "Aug 23",
//     revenue: 5700,
//   },
//   {
//     date: "Sep 23",
//     revenue: 4250,
//   },
//   {
//     date: "Oct 23",
//     revenue: 4182,
//   },
//   {
//     date: "Nov 23",
//     revenue: 3812,
//   },
//   {
//     date: "Dec 23",
//     revenue: 4900,
//   },
// ];

// const RecentDelivery = () => {
//     const [datas, setDatas] = React.useState<  null>(null)
//     const currencyFormatter = (number: number) =>
//       `$${Intl.NumberFormat("us").format(number)}`

//     const payload = datas?.payload?.[0]
//     const value = payload?.value

//     const formattedValue = payload
//       ? currencyFormatter(value)
//       : currencyFormatter(data[0].revenue)

//     return (
//       <div>
//         <p className="text-sm text-gray-700 dark:text-gray-300">
//           Revenue by month
//         </p>
//         <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-50">
//           {formattedValue}
//         </p>
//         <BarChart
//           data={data}
//           index="date"
//           categories={["revenue"]}
//           showLegend={false}
//           showYAxis={false}
//           startEndOnly={true}
//           className="-mb-2 mt-8 h-48"
//           tooltipCallback={(props) => {
//             if (props.active) {
//               setDatas((prev) => {
//                 if (prev?.label === props.label) return prev
//                 return props
//               })
//             } else {
//               setDatas(null)
//             }
//             return null
//           }}
//         />
//       </div>};

// export default RecentDelivery;
