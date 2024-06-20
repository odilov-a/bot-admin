import { useState } from "react";
import { Button } from "components";
import { useHooks, usePost } from "hooks";
import { Input, notification } from "antd";

const CategoryCreate = ({ createCategory, showCreateCategory }: any) => {
  const { get, queryClient, t } = useHooks();
  const { mutate } = usePost();
  const [inputValue, setInputValue] = useState({ titleUz: "", titleRu: "", titleEn: "" });
  const createCategoryFunc = () => {
    mutate(
      { method: "post", url: `categories`, data: { ...inputValue } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
          notification["success"]({
            message: t("Успешно!"),
            duration: 2,
          });
          showCreateCategory(!createCategory);
        },
        onError: (error: any) => {
          console.log(error);
          notification["error"]({
            message: get(error, "errorMessage", t("Произошло ошибка!")),
            duration: 2,
          });
        },
      }
    );
  };

  return (
    <div>
      <label>{t("Kategoriyasi (Uzbekcha)")}</label>
      <Input
        placeholder={t("Kategoriyasi (Uzbekcha)")} className="mb-[10px] p-[10px]"
        onChange={(e: any) => setInputValue(prev => ({ ...prev, titleUz: e.target.value }))}
      />
      <label>{t("Kategoriyasi (Ruscha)")}</label>
      <Input
        placeholder={t("Kategoriyasi (Ruscha)")} className="mb-[10px] p-[10px]"
        onChange={(e: any) => setInputValue(prev => ({ ...prev, titleRu: e.target.value }))}
      />
      <label>{t("Kategoriyasi (Inglizcha)")}</label>
      <Input
        placeholder={t("Kategoriyasi (Inglizcha)")} className="mb-[10px] p-[10px]"
        onChange={(e: any) => setInputValue(prev => ({ ...prev, titleEn: e.target.value }))}
      />
      <Button title={t("Create")} size="large" className="w-full" onClick={createCategoryFunc} />
    </div>
  );
};

export default CategoryCreate;