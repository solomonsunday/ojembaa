import React from "react";
import { Spinner } from "../Common/Spinner";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import PaginationButton from "../Common/PaginationButton.old";
import { IPageInfo } from "@/common/interfaces";

const DeliveryList = ({
  loading,
  deliveriesData,
  deliveriesPageInfo,
  currentPage,
  setCurrentPage,
}: {
  loading: boolean;
  deliveriesData: any;
  deliveriesPageInfo: IPageInfo;
  currentPage: number;
  setCurrentPage: any;
}) => {
  const router = useRouter();

  return (
    <div>
      <div className="font-semibold"> Deliveries</div>

      <div className="mb-4 overflow-auto rounded-lg">
        <table className="w-full">
          <thead className="border-b border-b-gray-400 borer">
            <tr className="">
              <th className="p-3 text-sm font-bold tracking-wide text-left">
                ID
              </th>
              <th className="p-3 text-sm font-bold tracking-wide text-left">
                Package Name
              </th>
              <th className="p-3 text-sm font-bold tracking-wide text-left">
                Receiver Name
              </th>
              <th className="p-3 text-sm font-bold tracking-wide text-left">
                Pickup Address
              </th>
              <th className="p-3 text-sm font-bold tracking-wide text-left ">
                Delivery Address
              </th>
              <th className="p-3 text-sm font-bold tracking-wide text-left">
                Date of Booking
              </th>
              <th className="p-3 text-sm font-bold tracking-wide text-left">
                Amount
              </th>
              <th className="p-3 text-sm font-bold tracking-wide text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-y-50 cursor-pointer ">
            {!loading &&
              deliveriesData?.map((data: any, idx: number) => {
                return (
                  <tr
                    className="hover:bg-orange-200"
                    key={idx}
                    onClick={() =>
                      router.push(`/admin/dashboard/deliveryDetail/${data.id}`)
                    }
                  >
                    <td className="p-2 text-sm text-gray-700 capitalize">
                      {(deliveriesPageInfo?.page! - 1) *
                        deliveriesPageInfo?.limit! +
                        idx +
                        1}
                    </td>
                    <td className="p-2 text-sm text-gray-700 capitalize">
                      {data.package.description}
                    </td>
                    <td className="p-2 text-sm text-gray-700 capitalize ">
                      {data.package.receiverName}
                    </td>
                    <td className="p-2 text-sm text-gray-700 capitalize">
                      {data.pickupAddress}
                    </td>
                    <td className="p-2 text-sm text-gray-700">
                      {data.deliveryAddress}
                    </td>
                    <td className="p-2 text-sm text-gray-700">
                      {dayjs(data?.sender?.createdAt).format("M/D/YYYY")}
                    </td>
                    <td className="p-2 text-sm text-gray-700">
                      &#8358;{data?.totalCost}{" "}
                    </td>
                    <td className="p-2 text-sm text-gray-700">
                      {data.status}{" "}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {loading ? (
          <div className="flex items-center justify-center h-96">
            {" "}
            <Spinner color="orange" />
          </div>
        ) : (
          deliveriesData?.length === 0 && (
            <div className="flex items-center justify-center font-bold h-96">
              No Data found!
            </div>
          )
        )}
      </div>
      <PaginationButton
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={deliveriesPageInfo?.totalPages!}
      />
    </div>
  );
};

export default DeliveryList;
