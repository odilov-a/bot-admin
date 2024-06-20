import { Spin } from "antd";
import { Field } from "formik";
import { Fields, Button } from "components";
import { Container } from "modules";
import { useHooks } from "hooks";

const YouTube = ({showCreateModal, createModal}: any): JSX.Element => {
  const { t, get } = useHooks();
  let data = createModal.data && createModal?.data;
  return (
    <div>
      <Container.Form
        url={data._id ? `youtubes/${get(data, "_id")}` : "youtubes"}
        method={data._id ? "put" : "post"}
        name="youtubes"
        fields={[
          {
            name: "link",
            type: "string",
            value: get(data, "link"),
            required: true,
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["youtubes"] });
          resetForm();
          showCreateModal(false);
        }}
        onError={(error) => {
          console.log("Error", error);
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Spin spinning={isSubmitting} tip="Verifying">
              <Field
                rootClassName="mb-[10px] w-full"
                component={Fields.Input}
                label={t("link")}
                name="link"
                type="text"
                placeholder={t("link")}
                size="large"
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

export default YouTube;