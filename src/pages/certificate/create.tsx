import { Spin } from "antd";
import { Field } from "formik";
import { Fields, Button } from "components";
import { Container } from "modules";
import { useHooks } from "hooks";

const Certificate = ({ showCreateModal, createModal }: any): JSX.Element => {
  const { t, get } = useHooks();
  let data = createModal.data && createModal?.data;
  return (
    <div>
      <Container.Form
        url={data._id ? `certificates/${get(data, "_id")}` : "certificates"}
        method={data._id ? "put" : "post"}
        name="certificates"
        configs={{
          headers: { "Content-Type": "multipart/form-data" },
        }}
        fields={[
          {
            name: "image",
            required: true,
            value: get(data, "image[0].small"),
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["certificates"] });
          resetForm();
          showCreateModal(false);
        }}
        onError={(error) => {
          console.log("Error", error);
        }}
      >
        {({ isSubmitting, setFieldValue }) => {
          return (
            <Spin spinning={isSubmitting} tip="Verifying">   
            <label>{t("Rasmni yuklang")}</label>
              <Field
                component={Fields.FileUpload}
                setFieldValue={setFieldValue}
                name="image"
                accept="image/png, image/jpeg, image/jpg"
              />
              <Button
                title={t("Saqlash")}
                className="w-full mt-[10px]"
                htmlType="submit"
                size="large"
              />
            </Spin>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Certificate;