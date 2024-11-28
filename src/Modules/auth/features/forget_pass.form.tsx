import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputLogin from "../../../components/inputBase";
import useForgetPass from "../hooks/useForgetPass";
import toast, { Toaster } from "react-hot-toast";
import PassInput from "../components/passInput";

const validationSchema = Yup.object().shape({
  smsCode: Yup.string()
    .required("کد تایید الزامی است")
    .min(4, "کد تایید باید حداقل 4 کاراکتر باشد"),
  newPass: Yup.string()
    .required("رمز عبور جدید الزامی است")
    .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد"),
  confirmNewPass: Yup.string()
    .required("تایید رمز عبور الزامی است")
    .oneOf([Yup.ref("newPass")], "رمز عبور و تایید آن باید یکسان باشند"),
});

const ForgetPassForm = () => {
  const { mutate } = useForgetPass();

  return (
    <>
      <Toaster position="bottom-left" reverseOrder={false} />
      <Formik
        initialValues={{
          smsCode: "",
          newPass: "",
          confirmNewPass: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          mutate(values, {
            onSuccess: () => {
              toast.success("رمز عبور با موفقیت بازیابی شد");
              setSubmitting(false);
              window.location.reload();
            },
            onError: () => {
              toast.error("خطا در بازیابی رمز عبور");
              setSubmitting(false);
            },
          });
        }}
      >
        {({ errors, touched, isSubmitting, getFieldProps }) => (
          <Form>
            <h1 className="text-center mb-4">
              کد تایید به شماره موبایل شما ارسال شد
            </h1>

            <div className="mb-4">
              <InputLogin
                type="text"
                label="کد تایید"
                placeholder="کد تایید"
                {...getFieldProps("smsCode")}
              />
              {errors.smsCode && touched.smsCode && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.smsCode}
                </div>
              )}
            </div>

            <div className="mb-4">
              <PassInput
                type="password"
                label="رمز عبور جدید"
                placeholder="رمز عبور جدید"
                {...getFieldProps("newPass")}
              />
              {errors.newPass && touched.newPass && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.newPass}
                </div>
              )}
            </div>

            <div className="mb-4">
              <PassInput
                type="password"
                label="تایید رمز عبور جدید"
                placeholder="تایید رمز عبور جدید"
                {...getFieldProps("confirmNewPass")}
              />
              {errors.confirmNewPass && touched.confirmNewPass && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.confirmNewPass}
                </div>
              )}
            </div>

            <button
              className="inline-block w-full mt-5 rounded px-4 py-3 text-md font-medium uppercase bg-blue-950 leading-normal text-white shadow-md transition duration-150 ease-in-out"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "در حال ارسال..." : "ثبت"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ForgetPassForm;
