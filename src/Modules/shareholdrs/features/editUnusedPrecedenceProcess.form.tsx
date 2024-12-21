import {
  usePurchacePrecendence,
  useUnusedPrecedenceProcess,
  useUnusedPrecedenceProcessPatch,
} from "../hooks";
import { useFormik } from "formik";
import {
  PurchacePrecendenceCreate,
  purchacePrecendenceTypes,
  unusedPrecedenceProcessTypes,
} from "../types";
import * as Yup from "yup";
import { useUnusedPrecedenceProcessStore } from "../store";


const EditUnusedPrecedenceProcessForm = () => {
  const { data: purchaseData } = usePurchacePrecendence();
  const { id } = useUnusedPrecedenceProcessStore();






  const { data: processData } = useUnusedPrecedenceProcess();

  const data = purchaseData?.find(
    (item: purchacePrecendenceTypes) => item.id === id
  );

  console.log(1,id)

  const { mutate: patchUnusedPrecedenceProcess } =
    useUnusedPrecedenceProcessPatch(data?.id);



  const formik = useFormik({
    initialValues: {
      amount: data?.amount?.toString() || "",
      process: data?.process?.toString() || "",
      price: data?.price?.toString() || "",
      total_price: data ? (data.price * data.amount).toString() : "",
      transaction_id: data?.transaction_id || "",
      status: data?.status || "",
      document: data?.document || "",
      type: data?.type?.toString() || "",
    },
    validationSchema: Yup.object({
      amount: Yup.string().required("مقدار الزامی است"),
      process: Yup.string().required("شرکت الزامی است"),
      type: Yup.string().required("نوع الزامی است"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const purchaseData: PurchacePrecendenceCreate = {
          amount: Number(values.amount),
          price: Number(values.price),
          total_price: Number(values.total_price),
          process: Number(values.process),
          transaction_id: values.transaction_id,
          status: values.status,
        };

        await patchUnusedPrecedenceProcess(purchaseData, {
          onSuccess: () => {
            console.log("Purchase precedence updated successfully");
          },
          onError: (error) => {
            console.error("Error updating purchase precedence:", error);
          },
        });
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCompanyId = Number(e.target.value);
    const selectedCompany = processData?.find(
      (process: unusedPrecedenceProcessTypes) =>
        process.id === selectedCompanyId
    );

    formik.setFieldValue("process", selectedCompanyId);
    formik.setFieldValue("price", selectedCompany?.price || "");

    if (formik.values.amount) {
      const totalPrice =
        (selectedCompany?.price || 0) * Number(formik.values.amount);
      formik.setFieldValue("total_price", totalPrice.toString());
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = e.target.value;
    formik.setFieldValue("amount", newAmount);

    if (formik.values.process) {
      const selectedCompany = processData?.find(
        (process: unusedPrecedenceProcessTypes) =>
          process.id === Number(formik.values.process)
      );
      const totalPrice = (selectedCompany?.price || 0) * Number(newAmount);
      formik.setFieldValue("total_price", totalPrice.toString());
    }
  };

  const isGatewayType = formik.values.type === "2";

  return (
    <div className="p-6">
      <h2 className="text-[#29D2C7] text-xl mb-6">ثبت حق تقدم</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount">مقدار</label>
          <input
            id="amount"
            name="amount"
            type="text"
            onChange={handleAmountChange}
            value={formik.values.amount}
            className="w-full p-2 border rounded"
          />
          {formik.errors.amount && formik.touched.amount && (
            <div className="text-red-500 text-sm">{formik.errors.amount}</div>
          )}
        </div>
        <div>
          <label htmlFor="company">فرایند</label>
          <select
            id="company"
            name="process"
            onChange={handleCompanyChange}
            value={formik.values.process}
            className="w-full p-2 border rounded"
          >
            <option value="">انتخاب کنید</option>
            {processData?.map((process: unusedPrecedenceProcessTypes) => (
              <option key={process.id} value={process.id}>
                {process.company}
              </option>
            ))}
          </select>
          {formik.errors.process && formik.touched.process && (
            <div className="text-red-500 text-sm">{formik.errors.process}</div>
          )}
        </div>
        <div>
          <label htmlFor="price">قیمت واحد</label>
          <input
            id="price"
            name="price"
            type="text"
            disabled
            value={formik.values.price}
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div>
          <label htmlFor="total_price">قیمت کل</label>
          <input
            id="total_price"
            name="total_price"
            type="text"
            disabled
            value={formik.values.total_price}
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div>
          <label htmlFor="status">وضعیت</label>
          <select
            id="status"
            name="status"
            onChange={formik.handleChange}
            value={formik.values.status}
            className="w-full p-2 border rounded"
          >
            <option value="pending">در انتظار</option>
            <option value="approved">تایید شده</option>
            <option value="rejected">رد شده</option>
          </select>
        </div>
        {!isGatewayType && (
          <>
            <div>
              <label htmlFor="transaction_id">شناسه تراکنش</label>
              <input
                id="transaction_id"
                name="transaction_id"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.transaction_id}
                className="w-full p-2 border rounded"
              />
            </div>
          </>
        )}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-[#29D2C7] hover:bg-[#008282] text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formik.isSubmitting ? "در حال ارسال..." : "ویرایش حق تقدم"}
        </button>
      </form>
    </div>
  );
};

export default EditUnusedPrecedenceProcessForm;