import { Spin } from "antd";
import { Field } from "formik";
import { useHooks } from "hooks";
import { Container } from "modules";
import { Fields, Button } from "components";
import { PlusCircleOutlined } from "@ant-design/icons";

const Product = ({ showCreateModal, createModal, showCreateCategory }: any): JSX.Element => {
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
            type: "string",
            required: true,
            name: "productNameUz",
            value: get(data, "productNameUz"),
          },
          {
            type: "string",
            required: true,
            name: "productNameRu",
            value: get(data, "productNameRu"),
          },
          {
            type: "string",
            required: true,
            name: "productNameEn",
            value: get(data, "productNameEn"),
          },
          {
            name: "price",
            type: "number",
            required: true,
            value: get(data, "price"),
          },
          {
            required: true,
            name: "category",
            value: get(data, "category.title"),
            type: get(data, "_id") ? "string" : "object",
            onSubmitValue: (value: any) => value.value,
          },
          {
            name: "image",
            required: true,
            value: get(data, "images[0].small"),
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
        {({ isLoading, setFieldValue }) => {
          return (
            <Spin spinning={isLoading} tip="Verifying">
              <div className="">
                <Field
                  type="text"
                  size="large"
                  name="productNameUz"
                  component={Fields.Input}
                  rootClassName="mb-[10px]"
                  label={t("Mahsulot nomi (Uzbekcha)")}
                  placeholder={t("Mahsulot nomi (Uzbekcha)")}
                />
                <Field
                  type="text"
                  size="large"
                  name="productNameRu"
                  component={Fields.Input}
                  rootClassName="mb-[10px]"
                  label={t("Mahsulot nomi (Ruscha)")}
                  placeholder={t("Mahsulot nomi (Ruscha)")}
                />
                <Field
                  type="text"
                  size="large"
                  name="productNameEn"
                  component={Fields.Input}
                  rootClassName="mb-[10px]"
                  label={t("Mahsulot nomi (Inglizcha)")}
                  placeholder={t("Mahsulot nomi (Inglizcha)")}
                />
                <Field
                  size="large"
                  name="price"
                  type="number"
                  label={t("Narxi")}
                  component={Fields.Input}
                  placeholder={t("Narxi")}
                  rootClassName="mb-[10px]"
                />
                <label>{t("Kategoriya tanlang")}</label>
                <div className="flex justify-between">
                  <Field
                    name="category"
                    url="/categories"
                    optionValue="_id"
                    optionLabel="category.title"
                    component={Fields.AntAsyncSelect}
                    placeholder={t("Kategoriya tanlang")}
                    onChange={(option: { [key: string]: any }) => {
                      setFieldValue("category.title", option);
                    }}
                    params={{ limit: 10 }}
                    rootClassName="w-full"
                    className="w-full mb-[10px]"
                  />
                  <div
                    className="ml-[20px] flex justify-center items-center w-[40px] h-[40px] cursor-pointer bg-[#3367F6] rounded-[5px]"
                    onClick={() => showCreateCategory(true)}
                  >
                    <PlusCircleOutlined style={{ color: "#fff" }} />
                  </div>
                </div>
                <label>{t("Rasm yuklash")}</label>
                <Field
                  name="image"
                  component={Fields.FileUpload}
                  setFieldValue={setFieldValue}
                  accept="image/png, image/jpeg, image/jpg"
                />
                <Button
                  title={t("Saqlash")}
                  className="w-full mt-[10px]"
                  htmlType="submit"
                  size="large"
                />
              </div>
            </Spin>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Product;
