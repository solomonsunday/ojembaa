"use client";
import { useToggleModalContext } from "@/common/context/ModalVisibilityContext";
import { ITransaction } from "@/common/interfaces";
import BackButton from "@/components/Admin/backButton";
import Button from "@/components/Admin/button";
import Container from "@/components/Admin/Container";
import AdminLayout from "@/components/Admin/layout";
import { Spinner } from "@/components/Common/Spinner";
import { useGetTransactions } from "@/hooks/useGetTransactions";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ApprovalModal from "./ApprovalModal";

const courierPayment = ({ params }: { params: { slug: string } }) => {
  const courierId = params.slug;
  const [courierPayment, setCourierPayment] = useState<ITransaction>();
  const { setIsShowModal, isShowModal } = useToggleModalContext();

  const {
    fetchTransaction,
    transactions,
    loading: loadingTransactions,
  } = useGetTransactions();

  useEffect(() => {
    fetchTransaction({ type: "RECONCILIATION" });
  }, []);

  const handleShowModal = () => {
    setIsShowModal((preVal) => !preVal);
  };
  useEffect(() => {
    if (transactions) {
      const paymentDetail = transactions.filter(
        (item) => item.id === courierId
      );
      setCourierPayment(paymentDetail[0]);
    }
  }, [transactions]);

  return (
    <AdminLayout>
      <Container className="md:pl-[3.75rem] md:pr-[4.625rem] pl-[2.5rem] pt-10 pb-7">
        <div>
          <div className="flex flex-wrap gap-5 justify-between ml-[.125rem] mr-[.625rem]">
            <BackButton
              text="Payment Details
"
            />
          </div>
          <div className="py-2">
            <hr />
          </div>
          {loadingTransactions ? (
            <div className="flex items-center justify-center h-96">
              {" "}
              <Spinner color="orange" />
            </div>
          ) : (
            <div>
              <div className="flex flex-row-reverse gap-3">
                <div className="flex gap-1 ">
                  {courierPayment?.status === "pending" ? (
                    <div>
                      <Button
                        className="rounded-md border bg-orange-500 py-2 px-2 hover:bg-orange-400"
                        onClick={() => handleShowModal()}
                      >
                        <span className="font-bold px-4">Approve</span>
                      </Button>
                    </div>
                  ) : (
                    <div className="border rounded-md p-3 bg-green-500 text-white">
                      Approved
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between align-middle my-5 border border-slate-400 rounded-2xl p-6">
                <div className=" space-y-5">
                  <div className="flex gap-3">
                    <div>Courier FullName:</div>
                    <div className="capitalize font-bold">
                      {courierPayment?.courier?.firstName +
                        " " +
                        courierPayment?.courier?.lastName}{" "}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div>Courier Phone:</div>
                    <div className="font-bold">
                      {courierPayment?.courier?.phone}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div>Courier Phone:</div>
                    <div className="font-bold">
                      {courierPayment?.courier?.phone}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div>Payment Date:</div>
                    <div className="font-bold">
                      {dayjs(courierPayment?.createdAt).format("MMMM D, YYYY")}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div>Amount Paid:</div>
                    <div className="font-bold">{courierPayment?.amount}</div>
                  </div>
                </div>

                <img
                  src={courierPayment?.courier.profilePhoto}
                  width="20%"
                  height="15%"
                  alt="courier profile image"
                  className="rounded-2xl"
                />
              </div>
              <div className="font-bold">Proof of payment:</div>
              <div className="border border-slate-500 rounded-2xl my-5 p-5 h-96 overflow-auto">
                <div>
                  <img
                    src={courierPayment?.proof}
                    // width="45%"
                    // height="20%"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {isShowModal && (
          <ApprovalModal
            handleShowModal={handleShowModal}
            courierId={courierId}
          />
        )}
      </Container>
    </AdminLayout>
  );
};

export default courierPayment;
