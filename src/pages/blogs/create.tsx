import { Spin } from "antd";
import { Field } from "formik";
import { Fields, Button, AntTextarea } from "components";
import { Container } from "modules";
import { useHooks } from "hooks";

const Blog = ({ showCreateModal, createModal }: any): JSX.Element => {
  const { t, get } = useHooks();
  let data = createModal.data && createModal?.data;
  return (
    <div>
      <Container.Form
        url={data._id ? `blogs/${get(data, "_id")}` : "blogs"}
        method={data._id ? "put" : "post"}
        name="blogs"
        configs={{
          headers: { "Content-Type": "multipart/form-data" },
        }}
        fields={[
          {
            name: "titleUz",
            type: "string",
            value: get(data, "titleUz"),
            required: true,
          },
          {
            name: "titleRu",
            type: "string",
            value: get(data, "titleRu"),
            required: true,
          },
          {
            name: "titleEng",
            type: "string",
            value: get(data, "titleEng"),
            required: true,
          },
          {
            name: "descriptionUz",
            type: "string",
            value: get(data, "descriptionUz"),
            required: true,
          },
          {
            name: "descriptionRu",
            type: "string",
            value: get(data, "descriptionRu"),
            required: true,
          },
          {
            name: "descriptionEng",
            type: "string",
            value: get(data, "descriptionEng"),
            required: true,
          },
          {
            name: "image",
            required: true,
            value: get(data, "image[0].small"),
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["blogs"] });
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
              <div className="flex justify-between">
                <div className="w-[48%]">
                  <Field
                    rootClassName="mb-[10px]"
                    label={t("titleUz")}
                    component={Fields.Input}
                    name="titleUz"
                    type="text"
                    placeholder={t("titleUz")}
                    size="large"
                  />
                  <Field
                    rootClassName="mb-[10px]"
                    label={t("titleRu")}
                    component={Fields.Input}
                    name="titleRu"
                    type="text"
                    placeholder={t("titleRu")}
                    size="large"
                  />
                  <Field
                    rootClassName="mb-[10px]"
                    label={t("titleEn")}
                    component={Fields.Input}
                    name="titleEng"
                    type="text"
                    placeholder={t("titleEn")}
                    size="large"
                  />
                  <Field
                    component={Fields.FileUpload}
                    setFieldValue={setFieldValue}
                    name="image"
                    accept="image/png, image/jpeg, image/jpg"
                  />
                </div>
                <div className="w-[48%]">
                  <Field
                    component={Fields.Textarea}
                    rootClassName="mb-[10px]"
                    label={t("descriptionUz")}
                    name="descriptionUz"
                    type="text"
                    placeholder={t("descriptionUz")}
                    rows={3}
                    size="large"
                  />
                  <Field
                    component={Fields.Textarea}
                    rootClassName="mb-[10px]"
                    label={t("descriptionRu")}
                    name="descriptionRu"
                    type="text"
                    placeholder={t("descriptionRu")}
                    rows={3}
                    size="large"
                  />
                  <Field
                    component={Fields.Textarea}
                    label={t("descriptionEn")}
                    rootClassName="mb-[10px]"
                    name="descriptionEng"
                    type="text"
                    placeholder={t("descriptionEn")}
                    rows={3}
                    size="large"
                  />
                </div>
              </div>
              <Button
                title={t("Saqlash")}
                className="w-full mt-[20px]"
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

export default Blog;