import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IApproveTxn } from "@/common/interfaces";
import Input from "@/components/Admin/input";
import Button from "@/components/Admin/button";
import { useApproveOrReject } from "@/hooks/useCreateApproveOrReject";
import { ApproveTxnDto } from "../../../../../common/interfaces";

interface IModal {
  handleShowModal: () => void;
  courierId: string;
}

const ApprovalModal = ({ handleShowModal, courierId }: IModal) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IApproveTxn>();

  const { createApprovePayment, loading } = useApproveOrReject();
  const [actionTake, setActionTaken] = useState<string>("");

  const onSubmit = (data: IApproveTxn) => {
    try {
      if (actionTake === ApproveTxnDto.REJECT) {
        console.log(actionTake, "actionTake");
        data.status = ApproveTxnDto.REJECT;
      } else {
        data.status = ApproveTxnDto.APPROVE;
      }
      createApprovePayment(courierId!, data);
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      handleShowModal();
    }
  };

  return (
    <div className="fixed inset-0 opacity-90 backdrop-blur-sm flex justify-center items-center bg-black">
      <div className="bg-white px-6  py-3 rounded-xl w-[28rem] z-10">
        <div className="flex justify-between items-center space-y-3 pb-3  px-2">
          <div>
            <div className="font-bold"> Payment Modal</div>
            <p className="flex justify-center text-xs font-bold">
              Approve or Reject this payment with reasons
            </p>
          </div>
          <div
            className="font-bold capitalize text-red-900 cursor-pointer shadow-md px-2 hover:rotate-3"
            onClick={handleShowModal}
          >
            X
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              label="Reason"
              type="text"
              {...register("reason", {
                required: "Reason is required",
              })}
            />
          </div>
          {errors?.reason && (
            <p className="text-red-500 italic">{errors.reason.message}</p>
          )}

          <div className="pb-2 flex justify-between gap-3">
            <Button
              className="py-3 flex items-center justify-center bg-green-800 rounded-md text-white hover:bg-green-500 w-full"
              type="submit"
              disabled={loading}
              onClick={() => setActionTaken(ApproveTxnDto.APPROVE)}
            >
              {loading ? "Approving..." : "Approve"}
            </Button>
            <Button
              className="py-3 flex items-center justify-center bg-red-800 rounded-md text-white hover:bg-red-500 w-full"
              type="submit"
              disabled={loading}
              onClick={() => setActionTaken(ApproveTxnDto.REJECT)}
            >
              {loading ? "Rejecting..." : "Reject"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApprovalModal;
