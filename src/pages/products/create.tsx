import { Spin, } from "antd";
import { Field } from "formik";
import { Fields, Button } from "components";
import { Container } from "modules";
import { useHooks } from "hooks";

const Product = ({ showCreateModal, createModal }: any): JSX.Element => {
  const { t, get } = useHooks();
  let data = createModal.data && createModal?.data;
  return (
    <div>
      <Container.Form
        url={data._id ? `products/${get(data, "_id")}` : "products"}
        method={data._id ? "put" : "post"}
        name="products"
        configs={{
          headers: { "Content-Type": "multipart/form-data" },
        }}
        fields={[
          {
            name: "titleUz",
            type: "string",
            required: true,
            value: get(data, "titleUz"),
          },
          {
            name: "titleRu",
            type: "string",
            required: true,
            value: get(data, "titleRu"),
          },
          {
            name: "titleEng",
            type: "string",
            required: true,
            value: get(data, "titleEng"),
          },
          {
            name: "descriptionUz",
            type: "string",
            required: true,
            value: get(data, "descriptionUz"),
          },
          {
            name: "descriptionRu",
            type: "string",
            required: true,
            value: get(data, "descriptionRu"),
          },
          {
            name: "descriptionEng",
            type: "string",
            required: true,
            value: get(data, "descriptionEng"),
          },
          {
            name: "type",
            type: get(data, "_id") ? "number" : "object",
            onSubmitValue: (value: any) => value.value,
            required: true,
            value: get(data, "type"),
          },
          {
            name: "image",
            required: true,
            value: get(data, "image[0].small"),
          },
          {
            name: "image02",
            value: get(data, "image02[0].small"),
          },
          {
            name: "image03",
            value: get(data, "image03[0].small"),
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["products"] });
          resetForm();
          showCreateModal(false);
        }}
        onError={(error) => {
          console.log("Error", error);
        }}
      >
        {({ isLoading, setFieldValue, }) => {
          return (
            <Spin spinning={isLoading} tip="Verifying">
              <div className="flex justify-between">
                <div className="w-[48%]">
                  <Field
                    label={t("titleUz")}
                    rootClassName="mb-[10px]"
                    component={Fields.Input}
                    name="titleUz"
                    type="text"
                    placeholder={t("titleUz")}
                    size="large"
                  />
                  <Field
                    label={t("titleRu")}
                    rootClassName="mb-[10px]"
                    component={Fields.Input}
                    name="titleRu"
                    type="text"
                    placeholder={t("titleRu")}
                    size="large"
                  />
                  <Field
                    label={t("titleEng")}
                    rootClassName="mb-[10px]"
                    component={Fields.Input}
                    name="titleEng"
                    type="text"
                    placeholder={t("titleEng")}
                    size="large"
                  />
                  <Field
                    component={Fields.SelectNew}
                    name="type"
                    placeholder={"Mahsulot turi"}
                    label={("Mahsulot turi")}
                    optionLabel="label"
                    optionValue="value"
                    options={[
                      { value: 1, label: t("Xom tovuq") },
                      { value: 2, label: t("Yarim tayyor") },
                      { value: 3, label: t("Muzlagan") },
                    ]}
                    onChange={(option: { [key: string]: any }) => {
                      setFieldValue("type", option.value);
                    }}
                    rootClassName="mb-[10px]"
                  />
                    <label>{t("Rasm yuklash")}</label>
                  <div className="flex">
                    <Field
                      component={Fields.FileUpload}
                      setFieldValue={setFieldValue}
                      name="image"
                      accept="image/png, image/jpeg, image/jpg"
                    />
                    <Field
                      component={Fields.FileUpload}
                      setFieldValue={setFieldValue}
                      name="image02"
                      accept="image/png, image/jpeg, image/jpg"
                    />
                    <Field
                      component={Fields.FileUpload}
                      setFieldValue={setFieldValue}
                      name="image03"
                      accept="image/png, image/jpeg, image/jpg"
                    />
                  </div>
                </div>
                <div className="w-[48%]">
                  <Field
                    component={Fields.Textarea}
                    name="descriptionUz"
                    rows={3}
                    rootClassName="mb-[10px]"
                    label={t("Ma'lumot (Uzbekcha)")}
                    placeholder={t("Ma'lumot (Uzbekcha)")}
                    required
                  />
                  <Field
                    component={Fields.Textarea}
                    name="descriptionRu"
                    rows={3}
                    rootClassName="mb-[10px]"
                    label={t("Ma'lumot (Ruscha)")}
                    placeholder={t("Ma'lumot (Ruscha)")}
                    required
                  />
                  <Field
                    component={Fields.Textarea}
                    name="descriptionEng"
                    rows={3}
                    rootClassName="mb-[10px]"
                    label={t("Ma'lumot (Inglizcha)")}
                    placeholder={t("Ma'lumot (Inglizcha)")}
                    required
                  />
                  <Button title={t("Saqlash")} className="w-full mt-[40px]" htmlType="submit" size="large" />
                </div>
              </div>
            </Spin>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Product;