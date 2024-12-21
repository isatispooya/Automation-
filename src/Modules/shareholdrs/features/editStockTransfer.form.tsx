import toast, { Toaster } from "react-hot-toast";
import Forms from "../../../components/forms";
import { StockTransferTypes } from "../types";
import useUpdateStockTransfer from "../hooks/useUpdateStockTransfer";
import * as yup from "yup";
import { useGetStockTransfer } from "../hooks";
import { useStockTransferStore } from "../store";

const EditStockTransferForm: React.FC = () => {
  const { mutate } = useUpdateStockTransfer();
  const { data: stockTransferData } = useGetStockTransfer();

  const { id } = useStockTransferStore();

  const stockTransfer = stockTransferData?.find(
    (item: StockTransferTypes) => item.id === id
  );

  const validationSchema = yup.object().shape({
    id: yup.number().required(),
    buyer: yup.number().required("خریدار الزامی است"),
    seller: yup.number().required("فروشنده الزامی است"),
    number_of_shares: yup.number().required("تعداد سهام الزامی است"),
    price: yup.number().required("قیمت الزامی است"),

    document: yup
      .string()
      .transform((value) => value || null)
      .nullable(),
  }) as yup.ObjectSchema<StockTransferTypes>;

  const formFields = [
    {
      name: "buyer",
      label: "خریدار",
      type: "text" as const,
    },
    {
      name: "seller",
      label: "فروشنده",
      type: "text" as const,
    },
    {
      name: "number_of_shares",
      label: "تعداد سهام",
      type: "text" as const,
    },
    {
      name: "price",
      label: "قیمت",
      type: "text" as const,
    },
  ];

  const initialValues = {
    buyer: stockTransfer?.buyer || 0,
    seller: stockTransfer?.seller || 0,
    number_of_shares: stockTransfer?.number_of_shares || 0,
    price: stockTransfer?.price || 0,

    document: stockTransfer?.document || null,
    id: stockTransferData?.id || 0,
    company: stockTransferData?.company || 0,
    user: stockTransferData?.user || 0,
  };

  const onSubmit = (values: StockTransferTypes) => {
    if (stockTransfer?.id) {
      mutate(
        { id: stockTransfer?.id, data: values },
        {
          onSuccess: () => {
            toast.success("سهامدار با موفقیت ویرایش شد");
          },
          onError: () => {
            toast.error("خطایی رخ داده است");
          },
        }
      );
    }
  };
  return (
    <>
      <Toaster />
      <Forms
        formFields={formFields}
        initialValues={initialValues}
        validationSchema={validationSchema}
        submitButtonText={{ default: "ثبت", loading: "در حال ثبت..." }}
        colors="text-[#5677BC]"
        buttonColors="bg-[#5677BC] hover:bg-[#02205F]"
        showCloseButton={true}
        onSubmit={onSubmit}
        title="ویرایش جابهجایی سهام"
      />
    </>
  );
};

export default EditStockTransferForm;
