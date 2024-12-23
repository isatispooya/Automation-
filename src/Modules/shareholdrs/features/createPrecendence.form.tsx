import Forms from "../../../components/forms";
import { usePostPrecendence } from "../hooks";
import * as Yup from "yup";
import { FormField } from "../../companies/types";
import { useUserData } from "../../users/hooks";
import { useCompaniesData } from "../../companies/hooks";
import toast, { Toaster } from "react-hot-toast";

const CreatePrecendenceForm = () => {
  const { mutate: postPrecendence } = usePostPrecendence();

  const { data: users, isLoading, error } = useUserData();
  console.log('Users data:', users);
  console.log('Users loading:', isLoading);
  console.log('Users error:', error);

  const { data: companies } = useCompaniesData();

  const formFields: FormField[] = [
    { name: "precedence", label: "حق تقدم", type: "text" as const },
    {
      name: "used_precedence",
      label: "حق تقدم استفاده شده",
      type: "text" as const,
    },
    {
      name: "company",
      label: "شرکت",
      type: "select" as const,
      options:
        companies?.map((company: { name: string; id: number }) => ({
          label: company.name || '',
          value: company.id.toString(),
        })) || [],
    },
    {
      name: "user",
      label: "کاربر",
      type: "select" as const,
      options:
        users?.map(
          (user: { first_name: string; last_name: string; id: number }) => ({
            label: `${user.first_name} ${user.last_name}`,
            value: user.id.toString(),
          })
        ) || [],
    },
  ];

  const initialValues = {
    company: "",
    precedence: "",
    used_precedence: "",
    user: "",
  };

  const validationSchema = Yup.object().shape({
    company: Yup.string().required("شرکت الزامی است"),
    precedence: Yup.string()
      .required("حق تقدم الزامی است")
      .matches(/^\d+$/, "فقط عدد مجاز است"),
    used_precedence: Yup.string()
      .required("حق تقدم استفاده شده الزامی است")
      .matches(/^\d+$/, "فقط عدد مجاز است"),
    user: Yup.string().required("کاربر الزامی است"),
  });

  return (
    <>
      <Toaster />
      <Forms
        formFields={formFields}
        initialValues={initialValues}
        validationSchema={validationSchema}
        title="ثبت حق تقدم"
        colors="text-[#29D2C7]"
        buttonColors="bg-[#29D2C7] hover:bg-[#008282]"
        submitButtonText={{
          default: "ثبت حق تقدم",
          loading: "در حال ارسال...",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            postPrecendence(
              {
                ...values,
                company: Number(values.company),
                precedence: Number(values.precedence),
                used_precedence: Number(values.used_precedence),
                user: Number(values.user),
                id: 0,
              },
              {
                onSuccess: () => {
                  toast.success("حق تقدم با موفقیت ثبت شد");
                },
                onError: (error) => {
                  toast.error("خطایی رخ داده است");
                  console.error("Error creating shareholder:", error);
                },
              }
            );
          } catch (error) {
            console.error("Error creating shareholder:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      />
    </>
  );
};

export default CreatePrecendenceForm;
